import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/nurses-index/nurses-index.component').then(
        ({ NursesIndexComponent }) => NursesIndexComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./views/nurses-detail/nurses-detail.component').then(
        ({ NursesDetailComponent }) => NursesDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./views/nurses-create/nurses-create.component').then(
        ({ NursesCreateComponent }) => NursesCreateComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./views/nurses-update/nurses-update.component').then(
        ({ NursesUpdateComponent }) => NursesUpdateComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
