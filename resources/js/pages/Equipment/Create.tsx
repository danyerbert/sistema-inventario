// resources/js/pages/Equipment/Create.tsx
import { Head, useForm } from '@inertiajs/react';
import equipment from '@/routes/equipment';
import type {
    TypeOfEquipment,
    Brand,
    OperationalStatus,
} from '@/types/inventory';
import EquipmentForm from './Form';

interface Props {
    tiposEquipo: TypeOfEquipment[];
    marcas: Brand[];
    estados: OperationalStatus[];
}

export default function Create({ tiposEquipo, marcas, estados }: Props) {
    const { post, transform } = useForm();

    const handleSubmit = (data: Record<string, string>) => {
        transform(() => data);
        post(equipment.store().url);
    };

    return (
        <>
            <Head title="Nuevo equipo" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <EquipmentForm
                    tiposEquipo={tiposEquipo}
                    marcas={marcas}
                    estados={estados}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Inventario', href: equipment.index() },
        { title: 'Nuevo equipo', href: equipment.create() },
    ],
};
