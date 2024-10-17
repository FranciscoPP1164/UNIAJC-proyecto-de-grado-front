import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/api/auth.service';
// import { AlertsService } from '../services/utils/alerts.service';
import { LocalStorageService } from '../services/utils/local-storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route) => {
  // const authService = inject(AuthService);
  // const alertsService = inject(AlertsService);
  const localStorageServie = inject(LocalStorageService);
  const router = inject(Router);
  const userString = localStorageServie.getEncryptedItem('user');
  const isRouteLogin = route.routeConfig?.path === 'login';

  if (!userString) {
    return isRouteLogin || logoutAndRedirectoToLogin();
  }

  console.log(isRouteLogin);

  return !isRouteLogin || redirectToHome();

  function logoutAndRedirectoToLogin(): boolean {
    localStorageServie.removeItem('user');
    router.navigateByUrl('/auth/login');
    return false;
  }

  function redirectToHome(): boolean {
    router.navigateByUrl('');
    return false;
  }
};
