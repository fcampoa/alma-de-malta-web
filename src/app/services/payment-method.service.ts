import { Injectable } from "@angular/core";
import { PaymentMethod } from "../models/payment-method";
import { ApiResponse } from "../models/response";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseService<PaymentMethod, ApiResponse> {
  
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'payment-methods');
  }
}