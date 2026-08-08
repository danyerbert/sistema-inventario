<?php

namespace Database\Seeders;

use App\Models\OperationalStatus;
use Illuminate\Database\Seeder;

class OperationalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $operationalStatus = ['Operativo', 'En reparación', 'De baja', 'En stock'];
        $countOperationalStatus = 0;
        foreach ($operationalStatus as $operational) {
            OperationalStatus::firstOrCreate(['operational_status' => $operational]);
            $countOperationalStatus++;
        }

        $this->command->info('-------------------------------------------------');
        $this->command->info(' Proceso de registro de Estatus de equipo con exito.');
        $this->command->info(" Registros creados: $countOperationalStatus");
        $this->command->info('---------------------------------------------------');
    }
}
