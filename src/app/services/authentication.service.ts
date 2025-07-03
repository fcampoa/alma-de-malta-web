import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Role } from "../enums/role.enum";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'})
  export class AuthenticationService {

    loggedIn: boolean = false;
    loggedInUser: User = {
        id: 'dev-id',
        name: "admin",
        email: "admin@email.com",
        role: Role.Admin,
    };

    constructor() { }
    
    loggedUser(): Observable<User> {
        return new Observable<User>(observer => {
            observer.next(this.loggedInUser);
            observer.complete();
        });
    }
  }