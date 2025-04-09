import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { AppointmentsService } from '../../../../services/api/appointments.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { IAppointmentResponse } from '../../../../interfaces/api/apointments/IAppointment.response';
import { HttpErrorResponse } from '@angular/common/http';
import { RowOptionsMenuComponent } from '../../../../components/row-options-menu/row-options-menu.component';
import { CommonModule } from '@angular/common';

interface IGroupedAppointment {
  day: Date;
  appointments: IAppointmentResponse[];
}

@Component({
  selector: 'app-appointments-index',
  standalone: true,
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './appointments-index.component.html',
  styleUrl: './appointments-index.component.css',
})
export class AppointmentsIndexComponent implements OnInit {
  constructor(
    private appointmentsService: AppointmentsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  appointments!: IAppointmentResponse[];
  groupedAppointments!: IGroupedAppointment[];

  ngOnInit(): void {
    this.getAppointments();
  }

  private getAppointments(): void {
    this.appointmentsService
      .all()
      .then((appointments) => {
        this.appointments = appointments.data;
        this.groupAppointmentsByDay();
        this.orderGroupedAppointments();
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  private getAppointmentsWithFilters() {
    this.appointmentsService
      .allWithFilters()
      .then((appointments) => {
        this.appointments = appointments.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  private groupAppointmentsByDay() {
    const groupedAppointments: IGroupedAppointment[] = [];

    this.appointments.map((appointment: IAppointmentResponse) => {
      const day = new Date(appointment.start_datetime);
      const group = groupedAppointments.find(
        (group) => group.day.toLocaleDateString() === day.toLocaleDateString()
      );

      if (group) {
        group.appointments.push(appointment);
        return;
      }

      groupedAppointments.push({
        day: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
        appointments: [appointment],
      });
    });

    this.groupedAppointments = groupedAppointments;
  }

  private orderGroupedAppointments() {
    this.groupedAppointments.sort((a, b) => b.day.getTime() - a.day.getTime());

    this.groupedAppointments.forEach((group) => {
      group.appointments.sort(
        (a, b) =>
          new Date(a.start_datetime).getTime() -
          new Date(b.start_datetime).getTime()
      );
    });
  }

  public handleClickAddAppointmentButton() {
    this.router.navigateByUrl('appointments/create');
  }

  public handleClickDetailAppointmentButton(id: string): void {
    this.router.navigateByUrl(`appointments/detail/${id}`);
  }
}
