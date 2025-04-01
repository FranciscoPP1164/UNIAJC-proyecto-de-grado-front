import { Component, OnInit } from '@angular/core';
import { INurseResponse } from '../../../../interfaces/api/nurses/INurse.response';
import { NursesService } from '../../../../services/api/nurses.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertResult } from 'sweetalert2';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';

@Component({
  selector: 'app-nurses-trashed',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './nurses-trashed.component.html',
  styleUrl: './nurses-trashed.component.css',
})
export class NursesTrashedComponent implements OnInit {
  trashedNurses!: INurseResponse[];

  constructor(
    private nursesService: NursesService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.getTrashedNurses();
  }

  private getTrashedNurses(): void {
    this.nursesService
      .trashed()
      .then((trashedNurses) => {
        this.trashedNurses = trashedNurses.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickRestoreNurseButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas restaurar este enfermero?',
        text: 'Esto lo movera a la lista de enfermeros',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.nursesService
          .restore(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Enfermero restaurado',
            });
            this.getTrashedNurses();
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

  handleClickDeletePermanentlyNurseButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title:
          '¿Estas seguro que deseas eliminar este enfermero permanentemente?',
        text: 'Esta accion es irreversible',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.nursesService
          .deletePermanently(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Enfermero eliminado permanentemente',
            });
            this.getTrashedNurses();
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
