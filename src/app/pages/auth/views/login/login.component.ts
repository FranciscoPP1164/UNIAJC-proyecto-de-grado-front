import { Component, OnInit } from '@angular/core';
import { InputTextComponent } from '../../../../components/forms/inputs/input-text/input-text.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/api/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthLayoutComponent } from '../../../../layouts/auth/auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, AuthLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public didTrySignIn: boolean = false;

  public isShowPassword = false;

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.buildDataForm();
  }

  private buildDataForm() {
    this.formLogin = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public handleClickShowPasswordButton(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  public handleSubmitFormLogin(): void {
    this.didTrySignIn = true;

    const username = this.formData['name'].value;
    const password = this.formData['password'].value;

    if (this.formLogin.invalid) {
      this.alertsService.make({
        icon: 'error',
        title: 'Por favor ingrese todos los campos',
      });
      return;
    }

    this.authService
      .login(username, password)
      .then(() => {
        this.alertsService.make({
          icon: 'success',
          title: 'Sesión iniciada exitosamente',
        });

        this.router.navigateByUrl('/');
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.alertsService.make({
            icon: 'error',
            title: 'El usuario o la contraseña son incorrectos',
          });

          return;
        }

        this.alertsService.make({
          icon: 'error',
          title: 'UPS, algo salió mal',
        });
      });
  }

  public get formData() {
    return this.formLogin.controls;
  }
}
