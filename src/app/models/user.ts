import { Role } from "../enums/role.enum";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role; // 'admin' or 'user'
    token?: string; // Optional, for JWT token
    }