// resources/js/pages/Brands/Create.tsx
import { Head, useForm } from '@inertiajs/react';
import brands from '@/routes/brands';
import BrandForm from './From';

export default function Create() {
    const { post, transform } = useForm();

    const handleSubmit = (data: { name_brand: string }) => {
        transform(() => data);
        post(brands.store().url);
    };

    return (
        <>
            <Head title="Nueva marca" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <BrandForm onSubmit={handleSubmit} />
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Marcas', href: brands.index() },
        { title: 'Nueva marca', href: '#' },
    ],
};
