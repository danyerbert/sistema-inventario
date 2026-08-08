// resources/js/pages/Models/Edit.tsx
import { Head, useForm } from '@inertiajs/react';
import models from '@/routes/models';
import type { DeviceModel, Brand, TypeOfEquipment } from '@/types/inventory';
import ModelForm from './Form';

interface Props {
    modelo: DeviceModel;
    marcas: Brand[];
    tiposEquipo: TypeOfEquipment[];
}

export default function Edit({ modelo, marcas, tiposEquipo }: Props) {
    const { put, transform } = useForm();

    const handleSubmit = (data: Record<string, string>) => {
        transform(() => data);
        put(models.update(modelo.id_model).url);
    };

    return (
        <>
            <Head title="Editar modelo" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <ModelForm
                    modelo={modelo}
                    marcas={marcas}
                    tiposEquipo={tiposEquipo}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Modelos', href: models.index() },
        { title: 'Editar modelo', href: '#' },
    ],
};
