import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then(
        ({ LoginComponent }) => LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./views/signup/signup.component').then(
        ({ SignupComponent }) => SignupComponent
      ),
  },
];
