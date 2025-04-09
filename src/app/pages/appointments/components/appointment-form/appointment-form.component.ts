import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppointmentResponse } from '../../../../interfaces/api/apointments/IAppointment.response';
import { IAppointmentRequest } from '../../../../interfaces/api/apointments/IAppointment.request';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IClientResponse } from '../../../../interfaces/api/clients/IClient.response';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { INurseResponse } from '../../../../interfaces/api/nurses/INurse.response';
import { NursesService } from '../../../../services/api/nurses.service';
import { AppointmentsService } from '../../../../services/api/appointments.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent implements OnInit {
  @Input() appointment?: IAppointmentResponse;
  @Input() patients: IPatientResponse[] = [];
  @Input() clients: IClientResponse[] = [];
  @Output() onSubmit = new EventEmitter<IAppointmentRequest>();

  nurses?: INurseResponse[];

  public patientsToRender!: IPatientResponse[];
  public nursesToRender!: INurseResponse[];
  public clientsToRender!: IClientResponse[];

  filteredClients = [...this.clients];
  filteredNurses?: INurseResponse[];
  filteredPatients = [...this.patients];

  // Selected items
  selectedClient?: IClientResponse = undefined;
  selectedNurses: INurseResponse[] = [];
  selectedPatients: IPatientResponse[] = [];

  // Search functionality
  clientSearchQuery = '';
  nurseSearchQuery = '';
  patientSearchQuery = '';

  formAppointment!: FormGroup;
  didTrySubmitForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private nursesService: NursesService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.buildClientForm();

    if (!this.appointment) {
      return;
    }

    this.selectedClient = this.appointment.client;
    this.selectedNurses = this.appointment.nurses;
    this.selectedPatients = this.appointment.patients;
    this.searchNurses();
  }

  buildClientForm(): void {
    this.formAppointment = this.formBuilder.group({
      tittle: [this.appointment?.tittle, [Validators.required]],
      description: [this.appointment?.description, [Validators.required]],
      start_datetime: [this.appointment?.start_datetime, [Validators.required]],
      end_datetime: [this.appointment?.end_datetime, [Validators.required]],
    });
  }

  filterClients() {
    this.filteredClients = this.clients.filter((client) => {
      if (this.filteredClients.length === 10) {
        return;
      }

      if (this.clientSearchQuery === '') {
        this.filteredClients = [];
        return;
      }

      return client.name
        .toLowerCase()
        .includes(this.clientSearchQuery.toLowerCase());
    });
  }

  filterPatients() {
    this.filteredPatients = this.patients.filter((patient) => {
      if (this.filteredPatients.length === 10) {
        return;
      }

      if (this.patientSearchQuery === '') {
        this.filteredPatients = [];
        return;
      }

      return patient.name
        .toLowerCase()
        .includes(this.patientSearchQuery.toLowerCase());
    });
  }

  selectClient(client: IClientResponse) {
    this.selectedClient = client;
    this.clientSearchQuery = '';
    this.filteredClients = [];
  }

  togglePatientSelection(patient: IPatientResponse) {
    const index = this.selectedPatients.findIndex((n) => n.id === patient.id);
    if (index >= 0) {
      this.selectedPatients.splice(index, 1);
    } else {
      this.selectedPatients.push(patient);
    }
    this.filteredPatients = [];
    this.clearFilters();
  }

  isPatientSelected(patient: IPatientResponse): boolean {
    return this.selectedPatients.some((n) => n.id === patient.id);
  }

  removePatient(patient: IPatientResponse) {
    this.selectedPatients = this.selectedPatients.filter(
      (n) => n.id !== patient.id
    );
  }

  searchNurses() {
    const startDateTime = new Date(this.formData['start_datetime'].value);
    const endDateTime = new Date(this.formData['end_datetime'].value);

    this.nursesService
      .frees(startDateTime, endDateTime)
      .then((nurses) => {
        this.nurses = nurses;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickSearchNursesButton() {
    if (
      this.formData['start_datetime'].invalid ||
      this.formData['end_datetime'].invalid
    ) {
      this.alertsService.make({
        icon: 'warning',
        title: 'Fechas requeridas',
        text: 'Por favor ingrese el rango de fechas que desea buscar',
      });
      return;
    }

    this.searchNurses();
  }

  filterNurses() {
    if (!this.nurses) {
      return;
    }

    if (this.nurseSearchQuery === '') {
      this.filteredNurses = undefined;
      return;
    }

    this.filteredNurses = this.nurses.filter((nurse) => {
      if (this.filteredNurses?.length === 10) {
        return;
      }

      return nurse.name
        .toLowerCase()
        .includes(this.nurseSearchQuery.toLowerCase());
    });
  }

  toggleNurseSelection(nurse: INurseResponse) {
    const index = this.selectedNurses.findIndex((n) => n.id === nurse.id);
    if (index >= 0) {
      this.selectedNurses.splice(index, 1);
    } else {
      this.selectedNurses.push(nurse);
    }
    this.filteredNurses = undefined;
    this.clearFilters();
  }

  isNurseSelected(nurse: INurseResponse): boolean {
    return this.selectedNurses.some((n) => n.id === nurse.id);
  }

  removeNurse(nurse: INurseResponse) {
    this.selectedNurses = this.selectedNurses.filter((n) => n.id !== nurse.id);
  }

  clearFilters() {
    this.clientSearchQuery = '';
    this.filteredClients = [];
    this.patientSearchQuery = '';
    this.filteredPatients = [];
    this.nurseSearchQuery = '';
    this.filteredNurses = [];
  }

  clearSelection(type: 'client' | 'nurses' | 'patients') {
    if (type === 'client') this.selectedClient = undefined;
    if (type === 'nurses') this.selectedNurses = [];
    if (type === 'patients') this.selectedPatients = [];
  }

  handleSubmitFormAppointment(): void {
    this.didTrySubmitForm = true;

    if (this.formAppointment.invalid) {
      this.alertsService.make({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor ingrese todos los campos requeridos',
      });
      return;
    }

    if (!this.selectedClient) {
      this.alertsService.make({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor escoja el cliente que va a reservar la cita',
      });
      return;
    }

    if (!this.selectedPatients || this.selectedPatients.length === 0) {
      this.alertsService.make({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor escoja los pacientes que van a ser atendidos',
      });
      return;
    }

    if (!this.selectedNurses || this.selectedNurses.length === 0) {
      this.alertsService.make({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor escoja los enfermeros que van a atender la cita',
      });
      return;
    }

    const appointment: IAppointmentRequest = this.formAppointment.value;

    appointment.client_id = this.selectedClient.id;
    appointment.patients_ids = this.selectedPatients.map(
      (patient) => patient.id
    );
    appointment.nurses_ids = this.selectedNurses.map((nurse) => nurse.id);

    this.onSubmit.emit(appointment);
  }

  get formData() {
    return this.formAppointment.controls;
  }
}
