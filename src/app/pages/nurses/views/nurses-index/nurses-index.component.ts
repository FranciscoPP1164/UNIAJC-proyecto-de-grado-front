import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { NursesService } from '../../../../services/api/nurses.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { INurseResponse } from '../../../../interfaces/api/nurses/INurse.response';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertResult } from 'sweetalert2';
import { RowOptionsMenuComponent } from '../../../../components/row-options-menu/row-options-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nurses-index',
  standalone: true,
  imports: [AppLayoutComponent, RowOptionsMenuComponent, CommonModule],
  templateUrl: './nurses-index.component.html',
  styleUrl: './nurses-index.component.css',
})
export class NursesIndexComponent implements OnInit {
  constructor(
    private nursesService: NursesService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  nurses!: INurseResponse[];

  ngOnInit(): void {
    this.getNurses();
  }

  private getNurses(): void {
    this.nursesService
      .all()
      .then((nurses) => {
        this.nurses = nurses.data;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleClickAddNurseButton(): void {
    this.router.navigateByUrl('nurses/create');
  }

  handleClickTrashedNursesButton(): void {
    this.router.navigateByUrl('nurses/trashed');
  }

  handleClickDetailNurseButton(id: string): void {
    this.router.navigateByUrl(`nurses/detail/${id}`);
  }

  handleSelectOptionMenu(id: string, action: 'edit' | 'delete'): void {
    switch (action) {
      case 'edit':
        this.handleClickEditNurseButton(id);
        break;

      case 'delete':
        this.handleClickDeleteNurseButton(id);
        break;

      default:
        break;
    }
  }

  handleClickEditNurseButton(id: string): void {
    this.router.navigateByUrl(`nurses/update/${id}`);
  }

  handleClickDeleteNurseButton(id: string): void {
    this.alertsService
      .confirm({
        icon: 'warning',
        title: '¿Estas seguro que deseas eliminar este enfermero?',
        text: 'Esto solo movera al enfermero a la papeleria de enfermeros',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result: SweetAlertResult) => {
        if (!result.isConfirmed) {
          return;
        }

        this.nursesService
          .delete(id)
          .then(() => {
            this.alertsService.make({
              icon: 'success',
              title: 'Enfermero eliminado',
            });
            this.getNurses();
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
