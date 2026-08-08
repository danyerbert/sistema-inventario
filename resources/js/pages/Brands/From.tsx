// resources/js/pages/Brands/Form.tsx
import { useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Brand } from '@/types/inventory';

interface Props {
    brand?: Brand;
    onSubmit: (data: { name_brand: string }) => void;
}

export default function BrandForm({ brand, onSubmit }: Props) {
    const { data, setData, processing, errors } = useForm({
        name_brand: brand?.name_brand ?? '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name_brand">Nombre de la marca</Label>
                <Input
                    id="name_brand"
                    value={data.name_brand}
                    onChange={(e) => setData('name_brand', e.target.value)}
                />
                <InputError message={errors.name_brand} />
            </div>
            <Button type="submit" disabled={processing}>
                Guardar
            </Button>
        </form>
    );
}
