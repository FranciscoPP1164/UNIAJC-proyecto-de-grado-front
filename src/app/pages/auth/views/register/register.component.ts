import { Component, Input, OnInit } from '@angular/core';
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
import { InputTextComponent } from '../../../../components/forms/inputs/input-text/input-text.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthLayoutComponent, InputTextComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public userId!: string;
  public verifyToken!: string;

  public formRegister!: FormGroup;
  public didTrySignIn: boolean = false;

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
