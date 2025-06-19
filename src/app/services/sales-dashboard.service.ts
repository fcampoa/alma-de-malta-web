import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { SaleDashboard } from "../models/sale";
import { ApiResponse } from "../models/response";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SalesDashboardService extends BaseService<SaleDashboard, ApiResponse> {
    
    constructor(private httpClient: HttpClient) {
        super(httpClient, "sales-dashboard");
    }
}