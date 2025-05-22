import { createFeatureSelector } from "@ngrx/store";
import { inventoryFeatureKey, productsFeatureKey } from "../features-keys";
import { ProductStateFeature } from "../states-definition/product.state";
import { InventoryStateFeature } from "../states-definition/Inventory.state";

export const GetProductsFeature = createFeatureSelector<ProductStateFeature>(productsFeatureKey);
export const GetInventoryFeature = createFeatureSelector<InventoryStateFeature>(inventoryFeatureKey);