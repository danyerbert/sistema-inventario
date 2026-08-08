export type * from './auth';
export type * from './navigation';
export type * from './ui';
export interface SharedData {
    name: string;
    auth: {
        user: Record<string, unknown> | null;
        permissions: string[];
    };
    sidebarOpen: boolean;
    [key: string]: unknown;
}
