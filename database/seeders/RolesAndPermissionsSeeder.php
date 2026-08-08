<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permisos = [
            'equipment.view',
            'equipment.create',
            'equipment.edit',
            'equipment.delete',
            'equipment.export',
            'brands.manage',
            'users.manage',
        ];

        foreach ($permisos as $permiso) {
            Permission::firstOrCreate(['name' => $permiso]);
        }

        $visor = Role::firstOrCreate(['name' => 'Visor']);
        $visor->syncPermissions(['equipment.view', 'equipment.export']);

        $editor = Role::firstOrCreate(['name' => 'Editor']);
        $editor->syncPermissions(['equipment.view', 'equipment.create', 'equipment.edit', 'equipment.export']);

        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $admin->syncPermissions($permisos); // todos
    }
}
