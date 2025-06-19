import { MeasureUnit } from "../enums/mesaure-unit.enum";
import { ProductCategory } from "../enums/product-category.enum";
import { ProductType } from "../enums/product-type.enum";
import { BaseEntity } from "./base-entity";

export interface Product extends BaseEntity {
  name?:string;
  description?:string;
  price?:number;
  imageUrl?:string;
  category?:ProductCategory;
  stock?:number;
  brand?:string;
  type?:ProductType;
  availability?:number;
  unit?:MeasureUnit;
  barcode?:string;
  isActive?:boolean;
}

export interface ProductOverview {
    productId?: string;
    name?: string;
    price?: number;
    description?: string;
    stock?: number;
}

export interface ProductSearchRequest {
    productType?: ProductType | null;
    productCategory?: ProductCategory | null;
    isActive?: boolean;
    brand?: string | null;
}