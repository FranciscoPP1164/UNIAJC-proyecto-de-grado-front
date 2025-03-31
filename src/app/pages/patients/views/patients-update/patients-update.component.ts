import { Component, Input, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { PatientsService } from '../../../../services/api/patients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IUpdatePatientRequest } from '../../../../interfaces/api/patients/IUpdatePatient.request';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';

@Component({
  selector: 'app-patients-update',
  standalone: true,
  imports: [AppLayoutComponent, PatientFormComponent],
  templateUrl: './patients-update.component.html',
  styleUrl: './patients-update.component.css',
})
export class PatientsUpdateComponent implements OnInit {
  @Input() id!: string;

  patient!: IPatientResponse;

  constructor(
    private patientsService: PatientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientsService
      .get(this.id)
      .then((patient: IPatientResponse) => {
        this.patient = patient;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleSubmitUpdatePatientForm(patient: IUpdatePatientRequest): void {
    this.patientsService
      .update(patient, this.id)
      .then(() => {
        this.router.navigateByUrl('/patients');
        this.alertsService.make({
          icon: 'success',
          title: 'Paciente actualizado',
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
