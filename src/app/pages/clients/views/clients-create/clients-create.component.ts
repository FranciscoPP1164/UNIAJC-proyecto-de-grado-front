import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { ClientsService } from '../../../../services/api/clients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { IClientRequest } from '../../../../interfaces/api/clients/IClient.request';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientFormComponent } from '../../components/client-form/client-form.component';

@Component({
  selector: 'app-clients-create',
  standalone: true,
  imports: [AppLayoutComponent, ClientFormComponent],
  templateUrl: './clients-create.component.html',
  styleUrl: './clients-create.component.css',
})
export class ClientsCreateComponent {
  constructor(
    private clientsService: ClientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  handleSubmitCreateClientForm(client: IClientRequest): void {
    this.clientsService
      .create(client)
      .then(() => {
        this.router.navigateByUrl('/clients');
        this.alertsService.make({
          icon: 'success',
          title: 'Cliente creado',
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
