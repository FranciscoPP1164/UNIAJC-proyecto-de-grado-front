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
    path: 'detail/:id',
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
    path: 'update/:id',
    loadComponent: () =>
      import('./views/update/update.component').then(
        ({ UpdateComponent }) => UpdateComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
