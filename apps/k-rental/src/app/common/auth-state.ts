import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "../core/store/auth/auth.selectors";
import { toSignal } from "@angular/core/rxjs-interop";

export function AuthState(){
    const store = inject(Store);
    const isAuthenticated = toSignal(
        store.select(selectIsAuthenticated)
    ) 

    return {
        isAuthenticated 
    }

}