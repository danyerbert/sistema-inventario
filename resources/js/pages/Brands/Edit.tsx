// resources/js/pages/Brands/Edit.tsx
import { Head, useForm } from '@inertiajs/react';
import brands from '@/routes/brands';
import type { Brand } from '@/types/inventory';
import BrandForm from './From';

interface Props {
    brand: Brand;
}

export default function Edit({ brand }: Props) {
    const { put, transform } = useForm();

    const handleSubmit = (data: { name_brand: string }) => {
        transform(() => data);
        put(brands.update(brand.id_brand).url);
    };

    return (
        <>
            <Head title="Editar marca" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <BrandForm brand={brand} onSubmit={handleSubmit} />
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Marcas', href: brands.index() },
        { title: 'Editar marca', href: '#' },
    ],
};
