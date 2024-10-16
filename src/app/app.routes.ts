import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.routes').then(({ routes }) => routes),
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
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./pages/appointments/appointments.routes').then(
        ({ routes }) => routes
      ),
  },
  {
    path: 'nurses',
    loadChildren: () =>
      import('./pages/nurses/nurses.routes').then(({ routes }) => routes),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./pages/patients/patients.routes').then(({ routes }) => routes),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./pages/clients/clients.routes').then(({ routes }) => routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
