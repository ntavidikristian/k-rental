import { AuthState } from "./auth/auth.reducer";

export interface GlobalState{
    app: {
        auth: AuthState;
    }    
}
