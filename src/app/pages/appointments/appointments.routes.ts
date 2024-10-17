import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/appointments-index/appointments-index.component').then(
        ({ AppointmentsIndexComponent }) => AppointmentsIndexComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./views/appointments-detail/appointments-detail.component').then(
        ({ AppointmentsDetailComponent }) => AppointmentsDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/appointments-create/appointments-create.component').then(
        ({ AppointmentsCreateComponent }) => AppointmentsCreateComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./views/appointments-update/appointments-update.component').then(
        ({ AppointmentsUpdateComponent }) => AppointmentsUpdateComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
