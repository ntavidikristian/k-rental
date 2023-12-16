import { UserCredentials } from "@k-rental/dtos";
import { createActionGroup, props } from "@ngrx/store";

export const loginActions = createActionGroup({
    source: 'Login',
    events: {
        login: props<UserCredentials>(),
    }
})