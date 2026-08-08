// resources/js/pages/Equipment/Edit.tsx
import { Head, useForm } from '@inertiajs/react';
import equipment from '@/routes/equipment';
import type {
    EquipmentDetail,
    TypeOfEquipment,
    Brand,
    OperationalStatus,
} from '@/types/inventory';
import EquipmentForm from './Form';

interface Props {
    equipo: EquipmentDetail;
    tiposEquipo: TypeOfEquipment[];
    marcas: Brand[];
    estados: OperationalStatus[];
}

export default function Edit({ equipo, tiposEquipo, marcas, estados }: Props) {
    const { put, transform } = useForm();

    const handleSubmit = (data: Record<string, string>) => {
        transform(() => data);
        put(equipment.update(equipo.id_equipment_details).url);
    };

    return (
        <>
            <Head title="Editar equipo" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <EquipmentForm
                    equipo={equipo}
                    tiposEquipo={tiposEquipo}
                    marcas={marcas}
                    estados={estados}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Inventario', href: equipment.index() },
        { title: 'Editar equipo', href: '#' },
    ],
};
