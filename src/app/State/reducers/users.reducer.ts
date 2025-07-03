import { createReducer, on } from "@ngrx/store";
import { UserState } from "../states-definition/user.state";
import * as UserActions from "../actions/user.actions";

export const initialState: UserState = {
    usersList: [],
    selectedUser: undefined,
};

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.SetUsers, (state, { users }) => ({
        ...state,
        usersList: users,
    })),
    on(UserActions.SetSelectedUser, (state, { user }) => ({
        ...state,
        selectedUser: user,
    }))    
);
