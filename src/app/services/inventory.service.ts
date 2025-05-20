import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { InventoryMovement } from "../models/inventory-movement";
import { ApiResponse } from "../models/response";

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseService<InventoryMovement, ApiResponse> {

    constructor(httpClient: HttpClient) {
        super(httpClient, 'inventory');
    }
}