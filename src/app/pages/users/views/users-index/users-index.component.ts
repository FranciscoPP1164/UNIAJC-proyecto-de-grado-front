import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';

@Component({
  selector: 'app-users-index',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './users-index.component.html',
  styleUrl: './users-index.component.css',
})
export class UsersIndexComponent {}
