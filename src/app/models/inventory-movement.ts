import { MeasureUnit } from "../enums/mesaure-unit.enum";
import { BaseEntity } from "./base-entity";
import { ProductOverview } from "./product";

export interface InventoryMovement extends BaseEntity {
    product?: ProductOverview;
    quantity?: number;
    reason?: string;
    date?: Date;
    userId?: string;
    isIncoming?: boolean;
    unit: MeasureUnit;
}