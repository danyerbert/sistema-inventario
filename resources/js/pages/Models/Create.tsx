// resources/js/pages/Models/Create.tsx
import { Head, useForm } from '@inertiajs/react';
import models from '@/routes/models';
import type { Brand, TypeOfEquipment } from '@/types/inventory';
import ModelForm from './Form';

interface Props {
    marcas: Brand[];
    tiposEquipo: TypeOfEquipment[];
}

export default function Create({ marcas, tiposEquipo }: Props) {
    const { post, transform } = useForm();

    const handleSubmit = (data: Record<string, string>) => {
        transform(() => data);
        post(models.store().url);
    };

    return (
        <>
            <Head title="Nuevo modelo" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <ModelForm
                    marcas={marcas}
                    tiposEquipo={tiposEquipo}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Modelos', href: models.index() },
        { title: 'Nuevo modelo', href: '#' },
    ],
};
