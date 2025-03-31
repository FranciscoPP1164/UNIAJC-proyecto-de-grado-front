import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { UsersService } from '../../../../services/api/users.service';
import { IUserResponse } from '../../../../interfaces/api/users/IUser.response';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SweetAlertResult } from 'sweetalert2';
import { RowOptionsMenuComponent } from '../../../../components/row-options-menu/row-options-menu.component';

@Component({
  selector: 'app-users-index',
  standalone: true,
  imports: [AppLayoutComponent, RowOptionsMenuComponent, CommonModule],
  templateUrl: './users-index.component.html',
  styleUrl: './users-index.component.css',
})
export class UsersIndexComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  users!: IUserResponse[];

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService
      .all()
      .then((users) => {
        this.users = users.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickAddUserButton(): void {
    this.router.navigateByUrl('users/create');
  }

  handleSelectOptionMenu(id: string, action: 'edit' | 'delete'): void {
    switch (action) {
      case 'edit':
        this.handleClickEditUserButton(id);
        break;

      case 'delete':
        this.handleClickDeleteUserButton(id);
        break;

      default:
        break;
    }
  }

  handleClickEditUserButton(id: string): void {
    this.router.navigateByUrl(`users/update/${id}`);
  }

  handleClickDeleteUserButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas eliminar este usuario?',
        text: 'Esta accion es irreversible',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.usersService
          .delete(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Usuario eliminado',
            });
            this.getUsers();
          })
          .catch((error: HttpErrorResponse) => {
            this.alertsService.make({
              icon: 'error',
              title: 'Error',
              text: error.error.errors,
            });
          });
      });
  }
}
