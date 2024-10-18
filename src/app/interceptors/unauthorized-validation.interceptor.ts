import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/utils/local-storage.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const unauthorizedValidationInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const localStorageServie = inject(LocalStorageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const STATUS_CODE = error.status;

      if (STATUS_CODE === 401) {
        return throwError(() => logoutAndRedirectoToLogin());
      }

      return throwError(() => error);
    })
  );

  function logoutAndRedirectoToLogin(): boolean {
    localStorageServie.removeItem('user');
    router.navigateByUrl('/auth/login');
    return false;
  }
};
