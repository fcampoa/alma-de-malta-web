import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthFacade } from "@facades/auth-facade";
import { catchError, switchMap, throwError } from "rxjs";

export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
        const authFacade = inject(AuthFacade);
        const router = inject(Router);
        return authFacade.getToken().pipe(
            switchMap(token => {
                debugger;
                if (token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
                    return next(req);
            }),            
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    router.navigate(['/login']);
                }
                return throwError(error);
            })
        );
    }