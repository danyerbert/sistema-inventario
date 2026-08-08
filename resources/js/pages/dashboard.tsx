import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface CountItem {
    id_type_of_equipment?: number;
    id_operational_status?: number;
    type_of_equipment?: string;
    operational_status?: string;
    equipment_details_count: number;
}

interface UltimoEquipo {
    id_equipment_details: number;
    property_number: string;
    type_of_equipment: { type_of_equipment: string };
    brand: { name_brand: string };
}

interface Props {
    totalEquipos: number;
    totalMarcas: number;
    totalPuestos: number;
    porTipo: CountItem[];
    porEstado: CountItem[];
    ultimosEquipos: UltimoEquipo[];
}

export default function Dashboard({
    totalEquipos,
    totalMarcas,
    totalPuestos,
    porTipo,
    porEstado,
    ultimosEquipos,
}: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-normal text-muted-foreground">
                                Equipos registrados
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{totalEquipos}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-normal text-muted-foreground">
                                Marcas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{totalMarcas}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-normal text-muted-foreground">
                                Puestos de trabajo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{totalPuestos}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Por tipo de equipo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {porTipo.map((item) => (
                                <div
                                    key={item.id_type_of_equipment}
                                    className="flex justify-between text-sm"
                                >
                                    <span>{item.type_of_equipment}</span>
                                    <span className="font-medium">
                                        {item.equipment_details_count}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Por estado operativo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {porEstado.map((item) => (
                                <div
                                    key={item.id_operational_status}
                                    className="flex justify-between text-sm"
                                >
                                    <span>{item.operational_status}</span>
                                    <span className="font-medium">
                                        {item.equipment_details_count}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Últimos equipos agregados</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {ultimosEquipos.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Todavía no hay equipos registrados.
                            </p>
                        )}
                        {ultimosEquipos.map((equipo) => (
                            <div
                                key={equipo.id_equipment_details}
                                className="flex justify-between border-b pb-2 text-sm last:border-0 last:pb-0"
                            >
                                <span>{equipo.property_number}</span>
                                <span className="text-muted-foreground">
                                    {equipo.type_of_equipment.type_of_equipment}{' '}
                                    · {equipo.brand.name_brand}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
