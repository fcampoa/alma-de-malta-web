import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ApiResponse } from "@models/response";
import { PurchaseOrderNumberPrefix } from "@models/sale";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderNumberPrefixService extends BaseService<PurchaseOrderNumberPrefix, ApiResponse> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, "sales/prefixes");
  }
}