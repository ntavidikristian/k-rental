import { createActionGroup, emptyProps } from "@ngrx/store";

export const logoutActions = createActionGroup({
    source: 'Logout',
    events: {
        logout: emptyProps(),
    }
})