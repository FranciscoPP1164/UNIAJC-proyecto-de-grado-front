import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.routes').then(({ routes }) => routes),
    canActivateChild: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then(({ routes }) => routes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.routes').then(({ routes }) => routes),
    canActivateChild: [authGuard],
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./pages/appointments/appointments.routes').then(
        ({ routes }) => routes
      ),
    canActivateChild: [authGuard],
  },
  {
    path: 'nurses',
    loadChildren: () =>
      import('./pages/nurses/nurses.routes').then(({ routes }) => routes),
    canActivateChild: [authGuard],
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./pages/patients/patients.routes').then(({ routes }) => routes),
    canActivateChild: [authGuard],
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./pages/clients/clients.routes').then(({ routes }) => routes),
    canActivateChild: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
