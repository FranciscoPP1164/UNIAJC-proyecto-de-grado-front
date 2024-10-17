import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';

@Component({
  selector: 'app-clients-index',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './clients-index.component.html',
  styleUrl: './clients-index.component.css',
})
export class ClientsIndexComponent {}
