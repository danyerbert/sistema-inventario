<?php

namespace Database\Seeders;

use App\Models\TypeOfEquipment;
use Illuminate\Database\Seeder;

class TypeOfEquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = ['Teclado', 'Mouse', 'PC', 'Pantalla'];
        $countTypeOfEquipment = 0;
        foreach ($tipos as $tipo) {
            TypeOfEquipment::firstOrCreate(['type_of_equipment' => $tipo]);
            $countTypeOfEquipment++;
        }

        $this->command->info('-------------------------------------------------');
        $this->command->info(' Proceso de registro de Tipo de Equipo con exito.');
        $this->command->info(" Registros creados: $countTypeOfEquipment");
        $this->command->info('---------------------------------------------------');
    }
}
