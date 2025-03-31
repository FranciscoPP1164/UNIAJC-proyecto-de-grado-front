import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { IClientResponse } from '../../../../interfaces/api/clients/IClient.response';
import { ClientsService } from '../../../../services/api/clients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-clients-trashed',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './clients-trashed.component.html',
  styleUrl: './clients-trashed.component.css',
})
export class ClientsTrashedComponent implements OnInit {
  trashedClients!: IClientResponse[];

  constructor(
    private clientsService: ClientsService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.getTrashedClients();
  }

  private getTrashedClients(): void {
    this.clientsService
      .trashed()
      .then((trashedClients) => {
        this.trashedClients = trashedClients.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickRestoreClientButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas restaurar este cliente?',
        text: 'Esto lo movera a la lista de cliente',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.clientsService
          .restore(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Cliente restaurado',
            });
            this.getTrashedClients();
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

  handleClickDeletePermanentlyClientButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title:
          '¿Estas seguro que deseas eliminar este cliente permanentemente?',
        text: 'Esta accion es irreversible',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.clientsService
          .deletePermanently(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Cliente eliminado permanentemente',
            });
            this.getTrashedClients();
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
