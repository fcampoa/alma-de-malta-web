import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Product } from "../models/product";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<Product, Response> {
    constructor(httpClient: HttpClient) {
        super(httpClient, 'products');
    }
}