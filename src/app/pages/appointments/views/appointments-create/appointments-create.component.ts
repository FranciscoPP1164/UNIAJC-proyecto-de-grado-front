import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { AppointmentsService } from '../../../../services/api/appointments.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAppointmentRequest } from '../../../../interfaces/api/apointments/IAppointment.request';
import { ClientsService } from '../../../../services/api/clients.service';
import { NursesService } from '../../../../services/api/nurses.service';
import { PatientsService } from '../../../../services/api/patients.service';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { INurseResponse } from '../../../../interfaces/api/nurses/INurse.response';
import { IClientResponse } from '../../../../interfaces/api/clients/IClient.response';

@Component({
  selector: 'app-appointments-create',
  standalone: true,
  imports: [AppLayoutComponent, AppointmentFormComponent],
  templateUrl: './appointments-create.component.html',
  styleUrl: './appointments-create.component.css',
})
export class AppointmentsCreateComponent implements OnInit {
  public clients!: IClientResponse[];
  public patients!: IPatientResponse[];

  constructor(
    private appointmentsService: AppointmentsService,
    private clientsService: ClientsService,
    private patientsService: PatientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getClients();
    this.getPatients();
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

  private getPatients(): void {
    this.patientsService
      .all()
      .then((patients) => {
        this.patients = patients.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleSubmitCreateAppointmentForm(appointment: IAppointmentRequest): void {
    this.appointmentsService
      .create(appointment)
      .then(() => {
        this.router.navigateByUrl('/appointments');
        this.alertsService.make({
          icon: 'success',
          title: 'Cita registrada',
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
