import { Component, OnInit } from '@angular/core';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { PatientsService } from '../../../../services/api/patients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-patients-trashed',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './patients-trashed.component.html',
  styleUrl: './patients-trashed.component.css',
})
export class PatientsTrashedComponent implements OnInit {
  trashedPatients!: IPatientResponse[];

  constructor(
    private patientsService: PatientsService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.getTrashedPatients();
  }

  private getTrashedPatients(): void {
    this.patientsService
      .trashed()
      .then((trashedPatients) => {
        this.trashedPatients = trashedPatients.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickRestorePatientButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas restaurar este paciente?',
        text: 'Esto lo movera a la lista de pacientes',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.patientsService
          .restore(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Paciente restaurado',
            });
            this.getTrashedPatients();
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

  handleClickDeletePermanentlyPatientButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title:
          '¿Estas seguro que deseas eliminar este paciente permanentemente?',
        text: 'Esta accion es irreversible',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.patientsService
          .deletePermanently(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Paciente eliminado permanentemente',
            });
            this.getTrashedPatients();
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
