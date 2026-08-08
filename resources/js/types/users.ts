// resources/js/types/users.ts
export interface UserRole {
    name: string;
}

export interface UserListItem {
    id: number;
    name: string;
    email: string;
    roles: UserRole[];
}

export interface UserEditable {
    id: number;
    name: string;
    email: string;
    role: string;
}