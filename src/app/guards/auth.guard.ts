import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Role } from "@enums/role.enum";
import { UserFacade } from "@facades/users.facade";
import { map, Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userFacade: UserFacade) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.userFacade.getSelectedUser().pipe(
            map(user => {
                if (!environment.production) {
                    return true;
                }
                if (!!user && user.role === Role.Admin) {
                    return true;
                }
                this.router.navigate(['/site']);
                return false;
            }
            ));
    }
}
