import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { UsersService } from '../../../../services/api/users.service';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { IUserRequest } from '../../../../interfaces/api/users/IUser.request';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [AppLayoutComponent, UserFormComponent],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.css',
})
export class UsersCreateComponent {
  constructor(
    private usersService: UsersService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  handleSubmitCreateUserForm(user: IUserRequest): void {
    this.usersService
      .create(user)
      .then(() => {
        this.router.navigateByUrl('/users');
        this.alertsService.make({
          icon: 'success',
          title: 'Usuario creado',
        });
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }
}
