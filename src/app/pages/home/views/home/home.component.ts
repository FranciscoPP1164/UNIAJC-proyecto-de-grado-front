import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import {
  CalendarOptions,
  EventClickArg,
  EventMountArg,
} from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { IAppointmentResponse } from '../../../../interfaces/api/apointments/IAppointment.response';
import { AppointmentsService } from '../../../../services/api/appointments.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppLayoutComponent, FullCalendarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  colors: { [key: string]: string } = {
    pending: '#9ca3af',
    started: '#facc15',
    canceled: '#f87171',
    ended: '#4ade80',
  };

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
    },
    eventDidMount: this.eventDidMounth.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getColor(status: string): string {
    return this.colors[status];
  }

  getAppointments(): void {
    this.appointmentsService
      .allWithFilters()
      .then((appointments: IAppointmentResponse[]) => {
        this.calendarOptions.events = appointments.map(
          ({ id, tittle, status, start_datetime, end_datetime }) => {
            return {
              id,
              title: tittle,
              status,
              start: start_datetime,
              end: end_datetime,
            };
          }
        );
      });
  }

  public handleClickAddAppointmentButton() {
    this.router.navigateByUrl('appointments/create');
  }

  eventDidMounth(event: EventMountArg) {
    const color = this.getColor(event.event.extendedProps['status']);

    event.el.style.background = color;
    event.el.style.borderBottomColor = '#fff';
    event.el.style.borderTopColor = '#fff';
    event.el.style.borderLeftColor = color;
    event.el.style.borderRightColor = color;
    event.el.style.color = '#000';
  }

  handleEventClick(event: EventClickArg) {
    const eventId = event.event._def.publicId;

    this.router.navigateByUrl(`appointments/detail/${eventId}`);
  }
}
