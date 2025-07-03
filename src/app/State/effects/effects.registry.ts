import { AuthEffects } from "./auth.effects";
import { InventoryEffects } from "./inventory.effects";
import { PaymentMethodsEffects } from "./payment-methods.effects";
import { ProductsEffects } from "./products.effects";
import { SalesEffects } from "./sales.effect";
import { UsersEffects } from "./users.effects";

export const Effects = [ProductsEffects, InventoryEffects, PaymentMethodsEffects, SalesEffects, AuthEffects, UsersEffects];