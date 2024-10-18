import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/api/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const activeUser = authService.activeUser;

  if (!activeUser) {
    return next(req);
  }

  const access_token = activeUser.access_token;

  const authenticatedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return next(authenticatedRequest);
};
