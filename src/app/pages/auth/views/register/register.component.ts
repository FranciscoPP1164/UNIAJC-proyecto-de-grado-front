import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from '../../../../layouts/auth/auth-layout/auth-layout.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { AuthService } from '../../../../services/api/auth.service';
import { IRegisterRequest } from '../../../../interfaces/api/auth/IRegister.request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthLayoutComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public userId!: string;
  public verifyToken!: string;

  public formRegister!: FormGroup;
  public didTrySignIn: boolean = false;

  public passwordRequirements = {
    minLength: false,
    hasMixedCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false,
  };

  public isShowPassword = false;
  public isShowConfirmPassword = false;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.buildDataForm();

    const userId = this.route.snapshot.queryParamMap.get('user');
    const verifyToken =
      this.route.snapshot.queryParamMap.get('verificationToken');

    if (!userId || !verifyToken) {
      this.router.navigateByUrl('auth/login');
      return;
    }

    this.userId = userId;
    this.verifyToken = verifyToken;
  }

  private buildDataForm() {
    this.formRegister = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  public handleChangeInputPassword(): void {
    const password = this.formData['password'].value;
    const confirmPassword = this.formData['confirm_password'].value;

    const validations = {
      minLength: password.length >= 8,
      hasMixedCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      passwordsMatch: password !== '' && confirmPassword !== '' && password === confirmPassword,
    };

    this.passwordRequirements = validations;
  }

  public handleClickShowPasswordButton(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  public handleClickShowConfirmPasswordButton(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  public handleSubmitFormLogin(): void {
    this.didTrySignIn = true;

    if (this.formRegister.invalid) {
      this.alertsService.make({
        icon: 'error',
        title: 'Por favor ingrese campos que sean válidos',
      });
      return;
    }

    const credentials: IRegisterRequest = this.formRegister.value;

    this.authService
      .register(credentials, this.userId, this.verifyToken)
      .then(() => {
        this.alertsService.make({
          icon: 'success',
          title: 'Registro exitoso',
        });

        this.router.navigateByUrl('/');
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'UPS, algo salió mal',
        });
      });
  }

  public get formData() {
    return this.formRegister.controls;
  }
}
