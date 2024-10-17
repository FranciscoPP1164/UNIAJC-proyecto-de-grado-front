import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/clients-index/clients-index.component').then(
        ({ ClientsIndexComponent }) => ClientsIndexComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./views/clients-detail/clients-detail.component').then(
        ({ ClientsDetailComponent }) => ClientsDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/clients-create/clients-create.component').then(
        ({ ClientsCreateComponent }) => ClientsCreateComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./views/clients-update/clients-update.component').then(
        ({ ClientsUpdateComponent }) => ClientsUpdateComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
