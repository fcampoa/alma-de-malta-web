import { AuthState } from "../states-definition/auth.state";
import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/auth.actions";


export const initialState: AuthState = {        
    isAuthenticated: false,
    user: null,
    accessToken: undefined,
    idToken: null,
    error: null,
    loading: false    
}

export const AuthReducer = createReducer<AuthState>(
    initialState,
    on(AuthActions.SetIsAuthenticated, (state, { isAuthenticated }) => ({
        ...state,
        isAuthenticated: isAuthenticated
    })),
    on(AuthActions.SetAuthUser, (state, { user }) => ({
        ...state,
        user: user
    })),
    on(AuthActions.SetAccessToken, (state, { accessToken }) => ({
        ...state,
        accessToken: accessToken
    })),
    on(AuthActions.SetIdToken, (state, { idToken }) => ({
        ...state,
        idToken: idToken
    })),
);
