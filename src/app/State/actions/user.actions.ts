import { createAction, props } from "@ngrx/store";
import { userFeatureKey } from "../features-keys";
import { User } from "@models/user";

const prefix = `${userFeatureKey} [User]`;

export const GetUsers = createAction(
    `${prefix} Get Users`
);

export const GetUserById = createAction(
    `${prefix} Get User By Id`,
    props<{ id: any }>()
);

export const SetUsers = createAction(
    `${prefix} Set Users`,
    props<{ users: User[] }>()
);

export const SetSelectedUser = createAction(
    `${prefix} Set Selected User`,
    props<{ user?: User }>()
);

export const CreateUser = createAction(
    `${prefix} Create User`,
    props<{ user: User }>()
);

export const UpdateUser = createAction(
    `${prefix} Update User`,
    props<{ user: User }>()
);

export const DeleteUser = createAction(
    `${prefix} Delete User`,
    props<{ id: any }>()
);

export const LoginUser = createAction(
    `${prefix} Login User`
);