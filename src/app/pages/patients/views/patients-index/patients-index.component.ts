import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { PatientsService } from '../../../../services/api/patients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-patients-index',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './patients-index.component.html',
  styleUrl: './patients-index.component.css',
})
export class PatientsIndexComponent implements OnInit {
  constructor(
    private patientsService: PatientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  patients!: IPatientResponse[];

  ngOnInit(): void {
    this.getPatients();
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

  handleClickAddPatientButton(): void {
    this.router.navigateByUrl('patients/create');
  }

  handleClickTrashedPatientsButton(): void {
    this.router.navigateByUrl('patients/trashed');
  }

  handleClickDetailPatientButton(id: string): void {
    this.router.navigateByUrl(`patients/detail/${id}`);
  }

  handleClickEditPatientButton(id: string): void {
    this.router.navigateByUrl(`patients/update/${id}`);
  }

  handleClickDeletePatientButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas eliminar este paciente?',
        text: 'Esto solo movera al paciente a la papeleria de pacientes',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.patientsService
          .delete(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Paciente eliminado',
            });
            this.getPatients();
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
