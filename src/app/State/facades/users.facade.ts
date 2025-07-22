import { Injectable } from "@angular/core";
import { UserStateFeature } from "../states-definition/user.state";
import { Store } from "@ngrx/store";
import * as UserSelector from "../selectors/user.selectors";
import * as UserActions from "../actions/user.actions";
import { User } from "@models/user";

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
    isUserLoggedIn = false;
    usersRetrieved = false;
    constructor(private store: Store<UserStateFeature>) {}

    getSelectedUser() {
        return this.store.select(UserSelector.GetSelectedUser);
    }

    users() {
        if (!this.usersRetrieved) {
            this.getUsers();
            this.usersRetrieved = true;
        }
        return this.store.select(UserSelector.GetUsers);
    }

    getUsers() {
        this.store.dispatch(UserActions.GetUsers());
    }

    createUser(user: User) {
        this.store.dispatch(UserActions.CreateUser({user}));
        this.usersRetrieved = false; // Reset users retrieved state to ensure fresh data
    }

    updateUser(user: User) {
        this.store.dispatch(UserActions.UpdateUser({user}));
        this.usersRetrieved = false; // Reset users retrieved state to ensure fresh data
    }

    deleteUser(id: any) {
        this.store.dispatch(UserActions.DeleteUser({id}));
        this.usersRetrieved = false; // Reset users retrieved state to ensure fresh data
    }

    setSelectedUser(user: User) {
        this.store.dispatch(UserActions.SetSelectedUser({user}));
    }

    getUserById(id: any) {
        this.store.dispatch(UserActions.GetUserById({id}));
    }

    login() {
        this.store.dispatch(UserActions.LoginUser());
    }

}