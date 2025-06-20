import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/response";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Sale, SaleDashboard } from "../models/sale";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SaleService extends BaseService<Sale, ApiResponse> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, "sales");
    }

    createSaleDashboard(saleDashboard: SaleDashboard): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(`${this.environment.apiBaseUrl}/dashboard`, saleDashboard);
    }
}