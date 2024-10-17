import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';

@Component({
  selector: 'app-appointments-index',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './appointments-index.component.html',
  styleUrl: './appointments-index.component.css',
})
export class AppointmentsIndexComponent {}
