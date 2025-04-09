import { Component, Input, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { IClientResponse } from '../../../../interfaces/api/clients/IClient.response';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { IAppointmentRequest } from '../../../../interfaces/api/apointments/IAppointment.request';
import { IUpdateAppointmentRequest } from '../../../../interfaces/api/apointments/IUpdateAppointment.request';
import { AppointmentsService } from '../../../../services/api/appointments.service';
import { ClientsService } from '../../../../services/api/clients.service';
import { PatientsService } from '../../../../services/api/patients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { IAppointmentResponse } from '../../../../interfaces/api/apointments/IAppointment.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-appointments-update',
  standalone: true,
  imports: [AppLayoutComponent, AppointmentFormComponent],
  templateUrl: './appointments-update.component.html',
  styleUrl: './appointments-update.component.css',
})
export class AppointmentsUpdateComponent implements OnInit {
  @Input() id!: string;

  public appointment!: IAppointmentResponse;
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
    this.getAppointment();
    this.getClients();
    this.getPatients();
  }

  private getAppointment(): void {
    this.appointmentsService
      .get(this.id)
      .then((appointment) => {
        this.appointment = appointment;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
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

  handleSubmitUpdateAppointmentForm(
    appointment: IUpdateAppointmentRequest
  ): void {
    this.appointmentsService
      .update(appointment, this.appointment.id)
      .then(() => {
        this.router.navigateByUrl(`/appointments/detail/${this.id}`);
        this.alertsService.make({
          icon: 'success',
          title: 'Cita actualizada',
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
