import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/index/index.component').then(
        ({ IndexComponent }) => IndexComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./views/detail/detail.component').then(
        ({ DetailComponent }) => DetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/create/create.component').then(
        ({ CreateComponent }) => CreateComponent
      ),
  },
  {
    path: ':id/update',
    loadComponent: () =>
      import('./views/update/update.component').then(
        ({ UpdateComponent }) => UpdateComponent
      ),
  },
];
