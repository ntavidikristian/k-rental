import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../../common/auth.service";
import { loginActions } from "../../../features/login/store/login.actions";
import { authActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(
            loginActions.login
        ),
        switchMap(
            credentials => this.authService.login(credentials).pipe(
                map(authToken => authActions.authSuccess({payload: authToken})),
                catchError((error: HttpErrorResponse) => of(authActions.authFailure({error: error.error})))
            )
        )
    ))

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ){

    }
}