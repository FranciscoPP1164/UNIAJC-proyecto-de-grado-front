import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextComponent } from '../../../../components/forms/inputs/input-text/input-text.component';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { AuthService } from '../../../../services/api/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ISignupRequest } from '../../../../interfaces/requests/ISignup.request';
import { AuthLayoutComponent } from '../../../../layouts/auth/auth-layout/auth-layout.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AuthLayoutComponent,
    InputTextComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  public formSignUp!: FormGroup;
  public didTrySignIn: boolean = false;

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
    this.formSignUp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public handleSubmitformSignUp(): void {
    this.didTrySignIn = true;

    if (this.formSignUp.invalid) {
      this.alertsService.make({
        icon: 'error',
        title: 'Por favor ingrese campos que sean válidos',
      });
      return;
    }

    const credentials: ISignupRequest = {
      email: this.formData['email'].value,
      name: this.formData['name'].value,
      password: this.formData['password'].value,
    };

    this.authService
      .signup(credentials)
      .then(() => {
        this.alertsService.make({
          icon: 'success',
          title: 'Usuario creado exitosamente',
        });

        this.router.navigateByUrl('auth/login');
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status === 406) {
          this.alertsService.make({
            icon: 'error',
            title: 'Proceso invalido',
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
    return this.formSignUp.controls;
  }
}
