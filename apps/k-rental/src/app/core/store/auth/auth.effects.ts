import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../../common/http/auth.service";
import { loginActions } from "../../../features/login/store/login.actions";
import { authActions } from "./auth.actions";
import { logoutActions } from "../../../features/login/store/logout.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(
            loginActions.login
        ),
        switchMap(
            ({ email, password }) => this.authService.login({email, password}).pipe(
                map((authToken) => authActions.authSuccess({payload: authToken})),
                tap(() => this.router.navigate(['/'])),
                catchError((error: HttpErrorResponse) => of(authActions.authFailure({error: error.error})))
            )
        )
    ));

    logoutUser$ = createEffect(() => this.actions$.pipe(
        ofType(
            logoutActions.logout
        ),
        tap(() => this.router.navigate(['/login']))
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ){

    }
}