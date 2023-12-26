import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../core/store/auth/auth.selectors';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(Store).select(selectIsAuthenticated).pipe(
    tap(isAuthenticated => !isAuthenticated && router.navigate(['/login']))
  );
  
};
