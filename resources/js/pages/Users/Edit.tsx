// resources/js/pages/Users/Edit.tsx
import { Head, useForm } from '@inertiajs/react';
import users from '@/routes/users';
import type { UserEditable } from '@/types/users';
import UserForm from './Form';

interface Props {
    usuario: UserEditable;
    roles: string[];
}

export default function Edit({ usuario, roles }: Props) {
    const { put, transform } = useForm();

    const handleSubmit = (data: Record<string, string>) => {
        transform(() => data);
        put(users.update(usuario.id).url);
    };

    return (
        <>
            <Head title="Editar usuario" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <UserForm
                    usuario={usuario}
                    roles={roles}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Usuarios', href: users.index() },
        { title: 'Editar usuario', href: '#' },
    ],
};
