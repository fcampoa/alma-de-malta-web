import { Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersFormComponent } from "./users-form/users-form.component";

export const routes: Routes = [
    { path: '', component: UsersListComponent },
    { path: 'create', component: UsersFormComponent }, 
    { path: ':id/edit', component: UsersFormComponent }

]