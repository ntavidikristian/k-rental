import { AuthToken } from "@k-rental/dtos";
import { createActionGroup, props } from "@ngrx/store";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        authSuccess: props<{payload: AuthToken}>(),
        authFailure: props<{error: any}>()
    }
})