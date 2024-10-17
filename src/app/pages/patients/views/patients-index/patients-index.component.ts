import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';

@Component({
  selector: 'app-patients-index',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './patients-index.component.html',
  styleUrl: './patients-index.component.css',
})
export class PatientsIndexComponent {}
