import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Product } from "../models/product";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "../models/response";

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<Product, ApiResponse> {
    constructor(httpClient: HttpClient) {
        super(httpClient, 'products');
    }
}