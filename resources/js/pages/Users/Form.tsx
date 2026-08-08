// resources/js/pages/Users/Form.tsx
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
import type { UserEditable } from '@/types/users';

interface FormData {
    name: string;
    email: string;
    password: string;
    role: string;
    [key: string]: string;
}

interface Props {
    usuario?: UserEditable;
    roles: string[];
    onSubmit: (data: FormData) => void;
}

export default function UserForm({ usuario, roles, onSubmit }: Props) {
    const { data, setData, processing, errors } = useForm<FormData>({
        name: usuario?.name ?? '',
        email: usuario?.email ?? '',
        password: '',
        role: usuario?.role ?? '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {usuario ? 'Editar usuario' : 'Nuevo usuario'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="max-w-sm space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            {usuario
                                ? 'Nueva contraseña (opcional)'
                                : 'Contraseña'}
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                            value={data.role}
                            onValueChange={(v) => setData('role', v)}
                        >
                            <SelectTrigger id="role" className="w-full">
                                <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((r) => (
                                    <SelectItem key={r} value={r}>
                                        {r}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Guardar
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
