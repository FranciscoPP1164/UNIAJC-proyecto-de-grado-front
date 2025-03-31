import { Component, Input, OnInit } from '@angular/core';
import { IClientResponse } from '../../../../interfaces/api/clients/IClient.response';
import { ClientsService } from '../../../../services/api/clients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IUpdateClientRequest } from '../../../../interfaces/api/clients/IUpdateClient.request';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { ClientFormComponent } from '../../components/client-form/client-form.component';

@Component({
  selector: 'app-clients-update',
  standalone: true,
  imports: [AppLayoutComponent, ClientFormComponent],
  templateUrl: './clients-update.component.html',
  styleUrl: './clients-update.component.css',
})
export class ClientsUpdateComponent implements OnInit {
  @Input() id!: string;

  client!: IClientResponse;

  constructor(
    private clientsService: ClientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientsService
      .get(this.id)
      .then((client: IClientResponse) => {
        this.client = client;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleSubmitUpdateClientForm(client: IUpdateClientRequest): void {
    this.clientsService
      .update(client, this.id)
      .then(() => {
        this.router.navigateByUrl('/clients');
        this.alertsService.make({
          icon: 'success',
          title: 'Cliente actualizado',
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
