// resources/js/pages/Models/Form.tsx
import { useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { DeviceModel, Brand, TypeOfEquipment } from '@/types/inventory';

interface FormData {
    name_model: string;
    id_brand: string;
    id_type_of_equipment: string;
    [key: string]: string;
}

interface Props {
    modelo?: DeviceModel;
    marcas: Brand[];
    tiposEquipo: TypeOfEquipment[];
    onSubmit: (data: FormData) => void;
}

export default function ModelForm({
    modelo,
    marcas,
    tiposEquipo,
    onSubmit,
}: Props) {
    const { data, setData, processing, errors } = useForm<FormData>({
        name_model: modelo?.name_model ?? '',
        id_brand: modelo ? String(modelo.id_brand) : '',
        id_type_of_equipment: modelo ? String(modelo.id_type_of_equipment) : '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name_model">Nombre del modelo</Label>
                <Input
                    id="name_model"
                    value={data.name_model}
                    onChange={(e) => setData('name_model', e.target.value)}
                />
                <InputError message={errors.name_model} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="id_brand">Marca</Label>
                <Select
                    value={data.id_brand}
                    onValueChange={(v) => setData('id_brand', v)}
                >
                    <SelectTrigger id="id_brand">
                        <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                        {marcas.map((m) => (
                            <SelectItem
                                key={m.id_brand}
                                value={String(m.id_brand)}
                            >
                                {m.name_brand}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.id_brand} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="id_type_of_equipment">Tipo de equipo</Label>
                <Select
                    value={data.id_type_of_equipment}
                    onValueChange={(v) => setData('id_type_of_equipment', v)}
                >
                    <SelectTrigger id="id_type_of_equipment">
                        <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                        {tiposEquipo.map((t) => (
                            <SelectItem
                                key={t.id_type_of_equipment}
                                value={String(t.id_type_of_equipment)}
                            >
                                {t.type_of_equipment}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.id_type_of_equipment} />
            </div>

            <Button type="submit" disabled={processing}>
                Guardar
            </Button>
        </form>
    );
}
