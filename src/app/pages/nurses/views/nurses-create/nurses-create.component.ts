import { Component } from '@angular/core';
import { NursesService } from '../../../../services/api/nurses.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { INurseRequest } from '../../../../interfaces/api/nurses/INurse.request';
import { HttpErrorResponse } from '@angular/common/http';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { NurseFormComponent } from '../../components/nurse-form/nurse-form.component';

@Component({
  selector: 'app-nurses-create',
  standalone: true,
  imports: [AppLayoutComponent, NurseFormComponent],
  templateUrl: './nurses-create.component.html',
  styleUrl: './nurses-create.component.css',
})
export class NursesCreateComponent {
  constructor(
    private nursesService: NursesService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  handleSubmitCreateNurseForm(nurse: INurseRequest): void {
    this.nursesService
      .create(nurse)
      .then(() => {
        this.router.navigateByUrl('/nurses');
        this.alertsService.make({
          icon: 'success',
          title: 'Enfemero creado',
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
