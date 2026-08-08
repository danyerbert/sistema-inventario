// resources/js/pages/Users/Index.tsx
import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import users from '@/routes/users';
import type {SharedData} from '@/types';
import type { PaginatedData } from '@/types/inventory';
import type { UserListItem } from '@/types/users';

interface Props {
    users: PaginatedData<UserListItem>;
    filters: { search?: string };
}

export default function Index({ users: data, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const currentUserId = (auth.user as { id?: number } | null)?.id;

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        router.get(users.index.url({ query: { ...filters, search: e.target.value } }), {}, { preserveState: true });
    };

    return (
        <>
            <Head title="Usuarios" />
            <div className="max-w-3xl mx-auto py-8 px-4 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Input
                        placeholder="Buscar por nombre o correo..."
                        defaultValue={filters.search}
                        onChange={handleSearch}
                        className="w-full sm:max-w-sm"
                    />
                    <Button asChild className="w-full sm:w-auto">
                        <Link href={users.create()}>+ Nuevo usuario</Link>
                    </Button>
                </div>

                <div className="grid gap-2">
                    {data.data.map(user => (
                        <div key={user.id} className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <p>{user.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {user.email} · {user.roles[0]?.name ?? 'Sin rol'}
                                </p>
                            </div>
                            <div className="space-x-1">
                                <Button variant="link" size="sm" asChild>
                                    <Link href={users.edit(user.id)}>Editar</Link>
                                </Button>
                                {user.id !== currentUserId && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="link" size="sm" className="text-red-600">Eliminar</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Eliminar este usuario?</AlertDialogTitle>
                                                <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => router.delete(users.destroy(user.id).url)}>
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [{ title: 'Usuarios', href: users.index() }],
};