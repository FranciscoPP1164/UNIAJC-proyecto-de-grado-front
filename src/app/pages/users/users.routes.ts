import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/users-index/users-index.component').then(
        ({ UsersIndexComponent }) => UsersIndexComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./views/users-detail/users-detail.component').then(
        ({ UsersDetailComponent }) => UsersDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/users-create/users-create.component').then(
        ({ UsersCreateComponent }) => UsersCreateComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./views/users-update/users-update.component').then(
        ({ UsersUpdateComponent }) => UsersUpdateComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
