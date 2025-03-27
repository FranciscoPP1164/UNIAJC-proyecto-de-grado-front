import { Component, Input, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { IUpdateUserRequest } from '../../../../interfaces/api/users/IUpdateUser.request';
import { UsersService } from '../../../../services/api/users.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { IUserResponse } from '../../../../interfaces/api/users/IUser.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-update',
  standalone: true,
  imports: [AppLayoutComponent, UserFormComponent],
  templateUrl: './users-update.component.html',
  styleUrl: './users-update.component.css',
})
export class UsersUpdateComponent implements OnInit {
  @Input() id!: string;

  user!: IUserResponse;

  constructor(
    private usersService: UsersService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService
      .get(this.id)
      .then((user: IUserResponse) => {
        this.user = user;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleSubmitUpdateUserForm(user: IUpdateUserRequest): void {
    this.usersService
      .update(user, this.id)
      .then(() => {
        this.router.navigateByUrl('/users');
        this.alertsService.make({
          icon: 'success',
          title: 'Usuario actualizado',
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
