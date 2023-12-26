import { AuthToken } from "@k-rental/dtos";
import { createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { loginActions } from "../../../features/login/store/login.actions";
import { logoutActions } from "../../../features/login/store/logout.actions";

export interface AuthState {
    credentials: AuthToken | null;
    isAuthenticating: boolean;
    authError: any | null
}



const LOCAL_STORAGE_KEY = 'token';


const authToken = localStorage?.getItem(LOCAL_STORAGE_KEY); // TODO change find better solution
const initCredentials: AuthToken | null  =  authToken && {
    authToken 
} || null;

const initState: AuthState  = {
    credentials: initCredentials,
    isAuthenticating: false,
    authError: null
}

export const authReducer = createReducer(
    initState,
    on(authActions.authSuccess, (state, {payload}) => ({...state, credentials: payload, isAuthenticating: false, authError: null})),
    on(authActions.authSuccess, (state, {payload}) => {// todo temporary solution
        localStorage.setItem(LOCAL_STORAGE_KEY, payload.authToken);
        payload.authToken
        return ({...state});
    }),
    on(authActions.authFailure, (state, {error}) => ({...state, credentials: null, isAuthenticating: false, authError: error})),
    on(loginActions.login, state => ({...state, isAuthenticating: true, credentials: null, authError: null})),
    on(logoutActions.logout, state => ({...state, isAuthenticating: false, credentials: null, authError: null}))
    
);