// resources/js/pages/Users/Create.tsx
import { Head, useForm } from '@inertiajs/react';
import users from '@/routes/users';
import UserForm from './Form';

interface Props {
    roles: string[];
}

export default function Create({ roles }: Props) {
    const { post, transform } = useForm();

    const handleSubmit = (data: Record<string, string>) => {
        transform(() => data);
        post(users.store().url);
    };

    return (
        <>
            <Head title="Nuevo usuario" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <UserForm roles={roles} onSubmit={handleSubmit} />
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Usuarios', href: users.index() },
        { title: 'Nuevo usuario', href: '#' },
    ],
};
