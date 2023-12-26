import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, concatMap, take, throwError } from 'rxjs';
import { selectAuthToken } from '../store/auth/auth.selectors';
import { logoutActions } from '../../features/login/store/logout.actions';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(
    selectAuthToken
  ).pipe(
    take(1),
    concatMap(token => {
      if(!token){
        return next(req);
      }

      return next(req.clone({
        headers: req.headers.set('Authorization',`Bearer ${token}`)
      }))
    }),
  
    catchError((httpError: HttpErrorResponse) => {
      if(httpError.status === 401){ // UNAUTHROIZED
        store.dispatch(logoutActions.logout());
      }
      return throwError(() => httpError)
    })
  );
};
