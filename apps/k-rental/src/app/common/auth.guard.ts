import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../core/store/auth/auth.selectors';

export const AuthGuard: CanActivateFn = (route, state) => {

  return inject(Store).select(selectIsAuthenticated);
  
};
