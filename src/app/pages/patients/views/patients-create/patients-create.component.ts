import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { PatientsService } from '../../../../services/api/patients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { IPatientRequest } from '../../../../interfaces/api/patients/IPatient.request';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';

@Component({
  selector: 'app-patients-create',
  standalone: true,
  imports: [AppLayoutComponent, PatientFormComponent],
  templateUrl: './patients-create.component.html',
  styleUrl: './patients-create.component.css',
})
export class PatientsCreateComponent {
  constructor(
    private patientsService: PatientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  handleSubmitCreatePatientForm(patient: IPatientRequest): void {
    this.patientsService
      .create(patient)
      .then(() => {
        this.router.navigateByUrl('/patients');
        this.alertsService.make({
          icon: 'success',
          title: 'Paciente creado',
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
