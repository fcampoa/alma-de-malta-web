import { Injectable } from "@angular/core";
import * as AuthActions from "../actions/auth.actions";
import * as UserActions from "../actions/user.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { catchError, filter, from, map, of, switchMap, take, withLatestFrom } from "rxjs";
import { UserService } from "@services/index";
import { User } from "@models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  loginEffect$;
  handleUserEffect$;
  constructor(private actions$: Actions, private router: Router, private AuthService: AuthService, private userService: UserService) {
    this.loginEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.Login),
        map(() => {
          this.AuthService.loginWithRedirect();
        })
      ),
      { dispatch: false }
    );

this.handleUserEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.CheckSession),
    switchMap(() =>
      this.AuthService.isAuthenticated$.pipe(
        take(1),
        filter(isAuthenticated => isAuthenticated),
        withLatestFrom(this.AuthService.user$),
        switchMap(([_, user]) => {
          if (!user) return of(AuthActions.SetIsAuthenticated({ isAuthenticated: false }));

          return this.AuthService.getAccessTokenSilently().pipe(
            switchMap(token =>
              this.userService.login({
                name: user.name,
                authProviderId: user.sub,
                email: user.email
              } as User).pipe(
                map(response => [
                  UserActions.SetSelectedUser({ user: response.body }),
                  AuthActions.SetAuthUser({ user: response.body }),
                  AuthActions.SetAccessToken({ accessToken: token })
                ]),
                catchError(() => of(AuthActions.SetIsAuthenticated({ isAuthenticated: false })))
              )
            )
          );
        }),
        switchMap(actions => from(Array.isArray(actions) ? actions : [actions]))
      )
    )
  )
);
  }
}
