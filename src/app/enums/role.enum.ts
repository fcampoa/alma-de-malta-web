export enum Role {
    Admin = 0,
    User = 1,
    Guest = 2
}

export const RoleLabels: { value: Role, label: string }[] = [
    { value: Role.Admin, label: 'Administrador' },
    { value: Role.User, label: 'Usuario' },
    { value: Role.Guest, label: 'Invitado' }
];