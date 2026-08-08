// resources/js/pages/Brands/Index.tsx
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
import brands from '@/routes/brands';
import type { Brand, PaginatedData } from '@/types/inventory';

interface Props {
    brands: PaginatedData<Brand>;
    filters: { search?: string };
}

export default function Index({ brands: data, filters }: Props) {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        router.get(
            brands.index.url({ query: { ...filters, search: e.target.value } }),
            {},
            { preserveState: true },
        );
    };

    return (
        <>
            <Head title="Marcas" />
            <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Input
                        placeholder="Buscar marca..."
                        defaultValue={filters.search}
                        onChange={handleSearch}
                        className="w-full sm:max-w-sm"
                    />
                    <Button asChild className="w-full sm:w-auto">
                        <Link href={brands.create()}>+ Nueva marca</Link>
                    </Button>
                </div>

                <div className="grid gap-2">
                    {data.data.map((brand) => (
                        <div
                            key={brand.id_brand}
                            className="flex items-center justify-between rounded-md border p-3"
                        >
                            <span>{brand.name_brand}</span>
                            <div className="space-x-1">
                                <Button variant="link" size="sm" asChild>
                                    <Link href={brands.edit(brand.id_brand)}>
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
                                                ¿Eliminar esta marca?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Si tiene modelos asociados, la
                                                eliminación fallará hasta que
                                                los reasignes o borres.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    router.delete(
                                                        brands.destroy(
                                                            brand.id_brand,
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
    breadcrumbs: [{ title: 'Marcas', href: brands.index() }],
};
