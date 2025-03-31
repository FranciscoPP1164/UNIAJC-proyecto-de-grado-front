import { Component, Input, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { PatientsService } from '../../../../services/api/patients.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertResult } from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-detail',
  standalone: true,
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './patients-detail.component.html',
  styleUrl: './patients-detail.component.css',
})
export class PatientsDetailComponent implements OnInit {
  @Input() id!: string;

  patient!: IPatientResponse;

  constructor(
    private patientsService: PatientsService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    this.patientsService
      .get(this.id)
      .then((patient: IPatientResponse) => {
        this.patient = patient;
        console.log(this.patient);
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickEditPatientButton(): void {
    this.router.navigateByUrl(`patients/update/${this.patient.id}`);
  }

  handleClickDeletePatientButton(): void {
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
          .delete(this.patient.id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Paciente eliminado',
            });
            this.router.navigateByUrl('/patients');
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

  handleClickAddConditionButton(): void {
    this.alertsService
      .ask({
        title: 'Agregar condición',
        inputLabel: 'Ingrese la condición',
        input: 'text',
      })
      .then(async (result: SweetAlertResult) => {
        if (!result.value) {
          this.alertsService.make({
            icon: 'warning',
            title: 'Condición requerida',
            text: 'Debe ingresar la condición que desea para el cliente',
          });

          return;
        }

        await this.patientsService.createCondition(
          { description: result.value },
          this.id
        );

        this.alertsService.make({
          icon: 'success',
          title: 'Condición creada',
        });

        this.getPatient();
      });
  }

  handleClickEditConditionButton(index: number): void {
    if (!this.patient.conditions) {
      return;
    }

    const condition = this.patient.conditions[index];

    this.alertsService
      .ask({
        title: 'Actualizar condición',
        inputLabel: 'Ingrese la condición',
        input: 'text',
        inputValue: condition.description,
      })
      .then(async (result: SweetAlertResult) => {
        if (!result.value) {
          this.alertsService.make({
            icon: 'warning',
            title: 'Condición requerida',
            text: 'Debe ingresar la condición que desea para el cliente',
          });

          return;
        }

        await this.patientsService.updateCondition(
          { description: result.value },
          this.id,
          condition.id
        );

        this.alertsService.make({
          icon: 'success',
          title: 'Condición actualizada',
        });

        this.getPatient();
      });
  }

  handleClickDeleteConditionButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas eliminar esta condición?',
        text: 'Esta accion es irreversible',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.patientsService
          .deleteCondition(this.patient.id, id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Condicion eliminada',
            });
            this.getPatient();
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
