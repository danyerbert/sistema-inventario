// resources/js/pages/Models/Index.tsx
import { Head, Link, router } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import models from '@/routes/models';
import type { DeviceModel, PaginatedData } from '@/types/inventory';

interface Props {
    modelos: PaginatedData<DeviceModel>;
    filters: { search?: string };
}

export default function Index({ modelos, filters }: Props) {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        router.get(
            models.index.url({ query: { ...filters, search: e.target.value } }),
            {},
            { preserveState: true },
        );
    };

    return (
        <>
            <Head title="Modelos" />
            <div className="mx-auto max-w-4xl space-y-4 px-4 py-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Input
                        placeholder="Buscar modelo..."
                        defaultValue={filters.search}
                        onChange={handleSearch}
                        className="w-full sm:max-w-sm"
                    />
                    <Button asChild className="w-full sm:w-auto">
                        <Link href={models.create()}>+ Nuevo modelo</Link>
                    </Button>
                </div>

                <div className="grid gap-2">
                    {modelos.data.map((modelo) => (
                        <div
                            key={modelo.id_model}
                            className="flex items-center justify-between rounded-md border p-3"
                        >
                            <div>
                                <p>
                                    {modelo.brand.name_brand} —{' '}
                                    {modelo.name_model}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {
                                        modelo.type_of_equipment
                                            ?.type_of_equipment
                                    }
                                </p>
                            </div>
                            <div className="space-x-1">
                                <Button variant="link" size="sm" asChild>
                                    <Link href={models.edit(modelo.id_model)}>
                                        Editar
                                    </Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="text-red-600"
                                        >
                                            Eliminar
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                ¿Eliminar este modelo?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción no se puede
                                                deshacer.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    router.delete(
                                                        models.destroy(
                                                            modelo.id_model,
                                                        ).url,
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [{ title: 'Modelos', href: models.index() }],
};
