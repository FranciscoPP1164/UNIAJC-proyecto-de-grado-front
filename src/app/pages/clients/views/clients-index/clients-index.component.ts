import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { ClientsService } from '../../../../services/api/clients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { IClientResponse } from '../../../../interfaces/api/clients/IClient.response';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertResult } from 'sweetalert2';
import { RowOptionsMenuComponent } from '../../../../components/row-options-menu/row-options-menu.component';

@Component({
  selector: 'app-clients-index',
  standalone: true,
  imports: [AppLayoutComponent, RowOptionsMenuComponent],
  templateUrl: './clients-index.component.html',
  styleUrl: './clients-index.component.css',
})
export class ClientsIndexComponent implements OnInit {
  constructor(
    private clientsService: ClientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  clients!: IClientResponse[];

  ngOnInit(): void {
    this.getClients();
  }

  private getClients(): void {
    this.clientsService
      .all()
      .then((clients) => {
        this.clients = clients.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickAddClientButton(): void {
    this.router.navigateByUrl('clients/create');
  }

  handleClickTrashedClientsButton(): void {
    this.router.navigateByUrl('clients/trashed');
  }

  handleClickDetailClientButton(id: string): void {
    this.router.navigateByUrl(`clients/detail/${id}`);
  }

  handleSelectOptionMenu(id: string, action: 'edit' | 'delete'): void {
    switch (action) {
      case 'edit':
        this.handleClickEditClientButton(id);
        break;

      case 'delete':
        this.handleClickDeleteClientButton(id);
        break;

      default:
        break;
    }
  }

  handleClickEditClientButton(id: string): void {
    this.router.navigateByUrl(`clients/update/${id}`);
  }

  handleClickDeleteClientButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas eliminar este cliente?',
        text: 'Esto solo movera al cliente a la papeleria de cliente',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.clientsService
          .delete(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Cliente eliminado',
            });
            this.getClients();
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
