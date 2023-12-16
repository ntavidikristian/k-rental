import { createSelector } from "@ngrx/store";
import { GlobalState } from "../global.state";

const featureSelector = (state: GlobalState) => state?.app?.auth;




export const selectAuthError = createSelector(
    featureSelector,
    state => state.authError
)

export const selectIsAuthenticated = createSelector(
    featureSelector,
    state => !!state.credentials?.authToken
)