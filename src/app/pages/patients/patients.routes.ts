import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/patients-index/patients-index.component').then(
        ({ PatientsIndexComponent }) => PatientsIndexComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./views/patients-detail/patients-detail.component').then(
        ({ PatientsDetailComponent }) => PatientsDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/patients-create/patients-create.component').then(
        ({ PatientsCreateComponent }) => PatientsCreateComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./views/patients-update/patients-update.component').then(
        ({ PatientsUpdateComponent }) => PatientsUpdateComponent
      ),
  },
  {
    path: 'trashed',
    loadComponent: () =>
      import('./views/patients-trashed/patients-trashed.component').then(
        ({ PatientsTrashedComponent }) => PatientsTrashedComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
