import { Injectable } from "@angular/core";
import { ApiResponse } from "@models/response";
import { User } from "@models/user";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
    })
export class UserService extends BaseService<any, ApiResponse> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, 'users');
    }
    login() {
        return this.httpClient.post<ApiResponse>(`${this.environment.apiBaseUrl}/users/login`, null);
    }
}