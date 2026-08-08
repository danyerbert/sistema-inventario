// resources/js/pages/Users/Edit.tsx
import { Head, useForm } from '@inertiajs/react';
import users from '@/routes/users';
import UserForm from './Form';
import { UserEditable } from '@/types/users';

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
            <div className="max-w-2xl mx-auto py-8 px-4">
                <UserForm usuario={usuario} roles={roles} onSubmit={handleSubmit} />
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