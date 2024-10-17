import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';

@Component({
  selector: 'app-nurses-index',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './nurses-index.component.html',
  styleUrl: './nurses-index.component.css',
})
export class NursesIndexComponent {}
