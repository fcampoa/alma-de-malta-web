import { User } from "@models/user";

export interface UserState {
    usersList?: User[];
    selectedUser?: User;    
}

export interface UserStateFeature {
    users: UserState;
}