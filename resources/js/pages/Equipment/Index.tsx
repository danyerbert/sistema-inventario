// resources/js/pages/Equipment/Index.tsx
import { Head, Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
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
import equipment from '@/routes/equipment';
import type { SharedData } from '@/types';
import type {
    EquipmentDetail,
    TypeOfEquipment,
    OperationalStatus,
    PaginatedData,
} from '@/types/inventory';

interface Props {
    equipos: PaginatedData<EquipmentDetail>;
    filters: {
        search?: string;
        id_operational_status?: string;
        id_type_of_equipment?: string;
    };
    tiposEquipo: TypeOfEquipment[];
    estados: OperationalStatus[];
}

function buildExportUrl(base: string, filters: Props['filters']) {
    const params = new URLSearchParams(
        Object.entries(filters).filter(([, v]) => v) as [string, string][],
    );
    const query = params.toString();

    return query ? `${base}?${query}` : base;
}

export default function Index({ equipos, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const can = (permiso: string) => auth.permissions.includes(permiso);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        router.get(
            equipment.index.url({
                query: { ...filters, search: e.target.value },
            }),
            {},
            { preserveState: true },
        );
    };

    const handleDelete = (id: number) => {
        router.delete(equipment.destroy(id).url);
    };

    return (
        <>
            <Head title="Inventario" />
            <div className="mx-auto max-w-6xl space-y-4 px-4 py-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Input
                        type="text"
                        placeholder="Buscar por número o serial..."
                        defaultValue={filters.search}
                        onChange={handleSearch}
                        className="w-full sm:max-w-sm"
                    />
                    {can('equipment.create') && (
                        <Button asChild className="w-full sm:w-auto">
                            <Link href={equipment.create()}>
                                + Nuevo equipo
                            </Link>
                        </Button>
                    )}
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <a
                                href={buildExportUrl(
                                    '/equipment/export/pdf',
                                    filters,
                                )}
                                target="_blank"
                                rel="noopener"
                            >
                                <FileDown className="size-4" /> PDF
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a
                                href={buildExportUrl(
                                    '/equipment/export/excel',
                                    filters,
                                )}
                            >
                                <FileSpreadsheet className="size-4" /> Excel
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Vista tabla — solo desktop/tablet */}
                <div className="hidden overflow-x-auto rounded-md border md:block">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-muted-foreground">
                                <th className="px-3 py-2 font-medium">
                                    N° Bien
                                </th>
                                <th className="px-3 font-medium">Serial</th>
                                <th className="px-3 font-medium">Tipo</th>
                                <th className="px-3 font-medium">Marca</th>
                                <th className="px-3 font-medium">Puesto</th>
                                <th className="px-3 font-medium">Estatus</th>
                                <th className="px-3 font-medium">
                                    Observaciones
                                </th>
                                <th className="px-3 text-right font-medium">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipos.data.map((equipo) => (
                                <tr
                                    key={equipo.id_equipment_details}
                                    className="border-b align-top last:border-0"
                                >
                                    <td className="px-3">
                                        {equipo.property_number ?? 'N/P'}
                                    </td>
                                    <td className="px-3">
                                        {equipo.serial ?? 'N/P'}
                                    </td>
                                    <td className="px-3">
                                        {
                                            equipo.type_of_equipment
                                                .type_of_equipment
                                        }
                                    </td>
                                    <td className="px-3">
                                        {equipo.brand.name_brand}
                                    </td>
                                    <td className="px-3">
                                        {equipo.workstation
                                            ?.number_workstation ?? '—'}
                                    </td>
                                    <td className="px-3">
                                        {
                                            equipo.operational_status
                                                .operational_status
                                        }
                                    </td>
                                    <td className="px-3">
                                        {equipo.observaciones ?? 'N/P'}
                                    </td>
                                    <td className="space-x-1 px-3 text-right">
                                        <Button variant="link" asChild>
                                            <Link
                                                href={equipment.edit(
                                                    equipo.id_equipment_details,
                                                )}
                                            >
                                                Editar
                                            </Link>
                                        </Button>
                                        <DeleteConfirm
                                            onConfirm={() =>
                                                handleDelete(
                                                    equipo.id_equipment_details,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Vista tarjetas — solo móvil */}
                <div className="grid gap-3 md:hidden">
                    {equipos.data.map((equipo) => (
                        <div
                            key={equipo.id_equipment_details}
                            className="space-y-1 rounded-md border p-4"
                        >
                            <div className="flex items-start justify-between">
                                <span className="font-medium">
                                    {equipo.property_number ?? 'N/P'}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {
                                        equipo.operational_status
                                            .operational_status
                                    }
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {equipo.type_of_equipment.type_of_equipment} ·{' '}
                                {equipo.brand.name_brand}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Serial: {equipo.serial ?? 'N/P'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Puesto:{' '}
                                {equipo.workstation?.number_workstation ?? '—'}
                            </p>
                            {equipo.observaciones && (
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {equipo.observaciones}
                                </p>
                            )}
                            <div className="flex justify-end gap-2 pt-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link
                                        href={equipment.edit(
                                            equipo.id_equipment_details,
                                        )}
                                    >
                                        Editar
                                    </Link>
                                </Button>
                                <DeleteConfirm
                                    onConfirm={() =>
                                        handleDelete(
                                            equipo.id_equipment_details,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function DeleteConfirm({ onConfirm }: { onConfirm: () => void }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="link" size="sm" className="text-red-600">
                    Eliminar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar este equipo?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. El registro se
                        eliminará permanentemente del inventario.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

Index.layout = {
    breadcrumbs: [{ title: 'Inventario', href: equipment.index() }],
};
