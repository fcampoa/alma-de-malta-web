import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Role } from "../enums/role.enum";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'})
  export class AuthenticationService {

    loggedIn: boolean = false;
    loggedInUser: User = {
        id: 0,
        name: "admin",
        email: "admin@email.com",
        password: "admin123",
        role: Role.Admin,
        token: "token"
    };

    constructor() { }
    
    loggedUser(): Observable<User> {
        return new Observable<User>(observer => {
            observer.next(this.loggedInUser);
            observer.complete();
        });
    }
  }