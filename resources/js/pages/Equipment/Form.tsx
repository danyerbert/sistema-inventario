// resources/js/pages/Equipment/Form.tsx
import { useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type {
    TypeOfEquipment,
    Brand,
    OperationalStatus,
    EquipmentDetail,
} from '@/types/inventory';

interface EquipmentFormData {
    property_number: string;
    serial: string;
    observaciones: string;
    id_type_of_equipment: string;
    id_brand: string;
    number_workstation: string;
    id_operational_status: string;
    [key: string]: string;
}

interface Props {
    equipo?: EquipmentDetail;
    tiposEquipo: TypeOfEquipment[];
    marcas: Brand[];
    estados: OperationalStatus[];
    onSubmit: (data: EquipmentFormData) => void;
}

export default function EquipmentForm({
    equipo,
    tiposEquipo,
    marcas,
    estados,
    onSubmit,
}: Props) {
    const { data, setData, processing, errors } = useForm<EquipmentFormData>({
        property_number: equipo?.property_number ?? '',
        serial: equipo?.serial ?? '',
        observaciones: equipo?.observaciones ?? '',
        id_type_of_equipment: equipo ? String(equipo.id_type_of_equipment) : '',
        id_brand: equipo ? String(equipo.id_brand) : '',
        number_workstation: equipo?.workstation?.number_workstation ?? '',
        id_operational_status: equipo
            ? String(equipo.id_operational_status)
            : '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {equipo ? 'Editar equipo' : 'Nuevo equipo'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="property_number">
                                Número de inventario
                            </Label>
                            <Input
                                id="property_number"
                                value={data.property_number}
                                onChange={(e) =>
                                    setData('property_number', e.target.value)
                                }
                            />
                            <InputError message={errors.property_number} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="serial">Serial</Label>
                            <Input
                                id="serial"
                                value={data.serial}
                                onChange={(e) =>
                                    setData('serial', e.target.value)
                                }
                            />
                            <InputError message={errors.serial} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="id_type_of_equipment">
                                Tipo de equipo
                            </Label>
                            <Select
                                value={data.id_type_of_equipment}
                                onValueChange={(value) =>
                                    setData('id_type_of_equipment', value)
                                }
                            >
                                <SelectTrigger
                                    id="id_type_of_equipment"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {tiposEquipo.map((t) => (
                                        <SelectItem
                                            key={t.id_type_of_equipment}
                                            value={String(
                                                t.id_type_of_equipment,
                                            )}
                                        >
                                            {t.type_of_equipment}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.id_type_of_equipment} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="id_brand">Marca</Label>
                            <Select
                                value={data.id_brand}
                                onValueChange={(value) =>
                                    setData('id_brand', value)
                                }
                            >
                                <SelectTrigger id="id_brand" className="w-full">
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
                            <Label htmlFor="number_workstation">
                                Puesto de trabajo
                            </Label>
                            <Input
                                id="number_workstation"
                                placeholder="Ej: PC-14"
                                value={data.number_workstation}
                                onChange={(e) =>
                                    setData(
                                        'number_workstation',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.number_workstation} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="id_operational_status">
                                Estado operativo
                            </Label>
                            <Select
                                value={data.id_operational_status}
                                onValueChange={(value) =>
                                    setData('id_operational_status', value)
                                }
                            >
                                <SelectTrigger
                                    id="id_operational_status"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {estados.map((s) => (
                                        <SelectItem
                                            key={s.id_operational_status}
                                            value={String(
                                                s.id_operational_status,
                                            )}
                                        >
                                            {s.operational_status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.id_operational_status}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="observaciones">Observaciones</Label>
                        <Textarea
                            id="observaciones"
                            value={data.observaciones}
                            onChange={(e) =>
                                setData('observaciones', e.target.value)
                            }
                            rows={3}
                        />
                        <InputError message={errors.observaciones} />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto"
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
