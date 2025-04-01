import { Component, Input, OnInit } from '@angular/core';
import { INurseResponse } from '../../../../interfaces/api/nurses/INurse.response';
import { NursesService } from '../../../../services/api/nurses.service';
import { AlertsService } from '../../../../services/utils/alerts.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IUpdateNurseRequest } from '../../../../interfaces/api/nurses/IUpdateNurse.request';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { NurseFormComponent } from '../../components/nurse-form/nurse-form.component';

@Component({
  selector: 'app-nurses-update',
  standalone: true,
  imports: [AppLayoutComponent, NurseFormComponent],
  templateUrl: './nurses-update.component.html',
  styleUrl: './nurses-update.component.css',
})
export class NursesUpdateComponent implements OnInit {
  @Input() id!: string;

  nurse!: INurseResponse;

  constructor(
    private nursesService: NursesService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nursesService
      .get(this.id)
      .then((nurse: INurseResponse) => {
        this.nurse = nurse;
      })
      .catch((error: HttpErrorResponse) => {
        this.alertsService.make({
          icon: 'error',
          title: 'Error',
          text: error.error.errors,
        });
      });
  }

  handleSubmitUpdateNurseForm(nurse: IUpdateNurseRequest): void {
    this.nursesService
      .update(nurse, this.id)
      .then(() => {
        this.router.navigateByUrl('/nurses');
        this.alertsService.make({
          icon: 'success',
          title: 'Enfermero actualizado',
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
