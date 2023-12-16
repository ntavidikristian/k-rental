import { AuthToken } from "@k-rental/dtos";
import { createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { loginActions } from "../../../features/login/store/login.actions";

export interface AuthState {
    credentials: AuthToken | null;
    isAuthenticating: boolean;
    authError: any | null
}


const initState: AuthState  = {
    credentials: null,
    isAuthenticating: false,
    authError: null
}

export const authReducer = createReducer(
    initState,
    on(authActions.authSuccess, (state, {payload}) => ({...state, credentials: payload, isAuthenticating: false, authError: null})),
    on(authActions.authFailure, (state, {error}) => ({...state, credentials: null, isAuthenticating: false, authError: error})),
    
    on(loginActions.login, state => ({...state, isAuthenticating: true, credentials: null, authError: null}))
    
);