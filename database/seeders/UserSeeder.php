<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'danyerbert@gmail.com'],
            [
                'name' => 'Danyerbert',
                'password' => Hash::make('27047631'),
                'email_verified_at' => now(),
            ]
        );

        $admin->assignRole('Admin');
    }
}
