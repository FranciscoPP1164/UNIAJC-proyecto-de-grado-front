import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then(
        ({ LoginComponent }) => LoginComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./views/signup/signup.component').then(
        ({ SignupComponent }) => SignupComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/register/register.component').then(
        ({ RegisterComponent }) => RegisterComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
