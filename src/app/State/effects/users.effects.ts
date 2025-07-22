import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NotificationService } from "@services/notification.service";
import { UserService } from "@services/user.service";
import { catchError, map, switchMap } from "rxjs";
import * as UserActions from "../actions/user.actions";
import { of } from "rxjs/internal/observable/of";
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
}
)
export class UsersEffects {
  createUserEffect$;
  updateUserEffect$;
  deleteUserEffect$;
  getUsersEffect$;
  getUserByIdEffect$;
  loginEffect$;
  constructor(private actions$: Actions,
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService) {

    this.createUserEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.CreateUser),
        switchMap(action =>
          this.userService.create(action.user).pipe(
            map(response => {
              debugger;
              this.notificationService.success("User created successfully");
              return UserActions.SetSelectedUser({ user: response.body });
            }),
            catchError(error => {
              debugger;
              console.error("Error creating user:", error);
              this.notificationService.error("Failed to create user");
              return of(UserActions.SetSelectedUser({ user: undefined }));
            })
          )
        )
      )
    );

    this.updateUserEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.UpdateUser),
        switchMap(action =>
          this.userService.update(action.user, action.user.id).pipe(
            map(response => {
              this.notificationService.success("User updated successfully");
              return UserActions.SetSelectedUser({ user: response.body });
            }),
            catchError(error => {
              console.error("Error updating user:", error);
              this.notificationService.error("Failed to update user");
              return of(UserActions.SetSelectedUser({ user: undefined }));
            })
          )
        )
      )
    );

    this.deleteUserEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.DeleteUser),
        switchMap(action =>
          this.userService.delete(action.id).pipe(
            map(() => {
              this.notificationService.success("User deleted successfully");
              return UserActions.GetUsers();
            }),
            catchError(error => {
              this.notificationService.error("Failed to delete user");
              return of(UserActions.GetUsers());
            })
          )
        )
      )
    );

    this.getUsersEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.GetUsers),
        switchMap(() =>
          this.userService.get().pipe(
            map(response => UserActions.SetUsers({ users: response.body })),
            catchError(error => {
              this.notificationService.error("Failed to load users");
              return of(UserActions.SetUsers({ users: [] }));
            })
          )
        )
      )
    );

    this.getUserByIdEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.GetUserById),
        switchMap(action =>
          this.userService.getById(action.id).pipe(
            map(response => UserActions.SetSelectedUser({ user: response.body })),
            catchError(error => {
              this.notificationService.error("Failed to load user");
              return of(UserActions.SetSelectedUser({ user: undefined }));
            })
          )
        )
      )
    );

    this.loginEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.LoginUser),
        switchMap(action =>
          this.userService.login().pipe(
            map(response => {
              debugger;
              this.notificationService.success("Login successful");
              console.log("Login response:", response);
              return UserActions.SetSelectedUser({ user: response.body });
            }),
            catchError(error => {
              if (!environment.production) {
              this.notificationService.error("Login failed");
              }
              console.error("Login error:", error);
              return of(UserActions.SetSelectedUser({ user: undefined }));
            })
          )
        )
      )
    );
  }
}
