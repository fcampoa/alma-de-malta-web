import { Role } from "@enums/role.enum";
import { BaseEntity } from "./base-entity";

export interface User extends BaseEntity {
    name: string;
    email: string;
    role: Role;
    phone?: string;
    authProviderId?: string;
    }