import { Injectable } from "@angular/core";
import * as AuthSelectors from "../selectors/auth.selectors";
import * as AuthActions from "../actions/auth.actions";
import { Store } from "@ngrx/store";
import { AuthState } from "../states-definition/auth.state";
import { AuthService } from "@auth0/auth0-angular";
import { UserFacade } from "./users.facade";
import { combineLatest, filter } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    isLoggedIn = false;

    constructor(private store: Store<AuthState>, private authService: AuthService, private userFacade: UserFacade) { }

    login() {
        // if (!environment.production) {
        //     this.devLogin();
        //     return;
        // }
        this.authService.loginWithRedirect();
    }

    private devLogin() {
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', true.toString());
        this.store.dispatch(AuthActions.SetIsAuthenticated({ isAuthenticated: true }));
        this.store.dispatch(AuthActions.SetAccessToken({ accessToken: environment.auth0.clientId }));
        this.userFacade.login();
    }
    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        this.store.dispatch(AuthActions.SetIsAuthenticated({ isAuthenticated: false }));
        this.authService.logout({logoutParams: { returnTo: environment.auth0.logoutUri }});
    }
    getToken() {
        return this.store.select(AuthSelectors.GetAccessToken);
    }

    getUser() {
        return this.store.select(AuthSelectors.GetAuthUser);
    }

    isAuthenticated() {
        return this.store.select(AuthSelectors.GetIsAuthenticated);
    }

    checkSession() {
        this.store.dispatch(AuthActions.CheckSession());
    }

    checkLoggedIn() {
        combineLatest([
            this.authService.isAuthenticated$,
            this.authService.user$,
            this.authService.getAccessTokenSilently()
        ]).pipe(
            filter(([isAuthenticated, user]) => isAuthenticated && !!user)
        ).subscribe({
            next: ([isAuthenticated, user, token]) => {
                debugger;
                if (!this.isLoggedIn) {
                    localStorage.setItem('access_token', token);
                    this.store.dispatch(AuthActions.SetAccessToken({ accessToken: token }));
                    this.store.dispatch(AuthActions.SetIsAuthenticated({ isAuthenticated }));
                    this.userFacade.login();
                }
            },
            error: (err) => {
                console.error('Error en checkLoggedIn:', err);
                this.isLoggedIn = false;
                this.store.dispatch(AuthActions.SetIsAuthenticated({ isAuthenticated: false }));
            }
        });
    }
}