import { Component, Input, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { IAppointmentResponse } from '../../../../interfaces/api/apointments/IAppointment.response';
import { AppointmentsService } from '../../../../services/api/appointments.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-appointments-detail',
  standalone: true,
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './appointments-detail.component.html',
  styleUrl: './appointments-detail.component.css',
})
export class AppointmentsDetailComponent implements OnInit {
  @Input() id!: string;

  appointment!: IAppointmentResponse;

  constructor(
    private appointmentsService: AppointmentsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAppointment();
  }

  getAppointment(): void {
    this.appointmentsService
      .get(this.id)
      .then((appointment: IAppointmentResponse) => {
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

  getInitials(name: string): string {
    if (!name) return '';

    // Split into parts and filter out empty strings
    const parts = name.split(' ').filter((part) => part.length > 0);

    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

    // Get first letter of first and last parts
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(
      0
    )}`.toUpperCase();
  }

  handleClickEditAppointmentButton(): void {
    this.router.navigateByUrl(`appointments/update/${this.appointment.id}`);
  }

  handleClickStartAppointmentButton(): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas iniciar esta cita?',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.appointmentsService
          .start(this.appointment.id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Cita iniciada',
            });
            this.getAppointment();
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

  handleClickCancelAppointmentButton(): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas cancelar esta cita?',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.appointmentsService
          .cancel(this.appointment.id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Cita cancelada',
            });
            this.getAppointment();
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

  handleClickAddCommentButton(): void {
    this.alertsService
      .ask({
        title: 'Agregar comentario',
        inputLabel: 'Ingrese el comentario',
        input: 'text',
      })
      .then(async (result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        if (!result.value) {
          this.alertsService.make({
            icon: 'warning',
            title: 'Comentario requerida',
            text: 'Debe ingresar el comentario que desea',
          });

          return;
        }

        await this.appointmentsService.createComment(
          { description: result.value },
          this.id
        );

        this.alertsService.make({
          icon: 'success',
          title: 'Comentario cread0',
        });

        this.getAppointment();
      });
  }

  handleClickDeleteCommentButton(commentId: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas eliminar este comentario?',
        text: 'Esta accion es irreversible',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.appointmentsService
          .deleteComment(this.appointment.id, commentId)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Comentario eliminado',
            });
            this.getAppointment();
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

  handleClickEndAppointmentButton(): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas finzalizar esta cita?',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.appointmentsService
          .end(this.appointment.id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Cita finalizada',
            });
            this.getAppointment();
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
