<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\DeviceModel;
use App\Models\TypeOfEquipment;
use Illuminate\Database\Seeder;

class DeviceModelSeeder extends Seeder
{
    public function run(): void
    {
        $catalogo = [
            'Teclado' => [
                'Logitech' => ['K120', 'MK120'],
                'HP' => ['KM100'],
                'Dell' => ['KB216'],
                'Genius' => ['KB-100'],
            ],
            'Mouse' => [
                'Logitech' => ['M90', 'MX Master 3'],
                'HP' => ['X1000'],
                'Dell' => ['MS116'],
                'Redragon' => ['M711'],
            ],
            'PC' => [
                'HP' => ['EliteDesk 800 G6'],
                'Dell' => ['OptiPlex 7090'],
                'Lenovo' => ['ThinkCentre M720'],
            ],
            'Pantalla' => [
                'Samsung' => ['LS24R350'],
                'LG' => ['24MP400'],
                'HP' => ['E243'],
                'Dell' => ['P2419H'],
            ],
        ];
        $countDeviceModels = 0;
        foreach ($catalogo as $tipoNombre => $marcas) {
            $tipo = TypeOfEquipment::where('type_of_equipment', $tipoNombre)->firstOrFail();

            foreach ($marcas as $marcaNombre => $modelos) {
                $marca = Brand::where('name_brand', $marcaNombre)->firstOrFail();

                foreach ($modelos as $modelo) {
                    DeviceModel::firstOrCreate([
                        'name_model' => $modelo,
                        'id_brand' => $marca->id_brand,
                        'id_type_of_equipment' => $tipo->id_type_of_equipment,
                    ]);
                }
            }
            $countDeviceModels++;
        }
        $this->command->info('-------------------------------------------------');
        $this->command->info(' Proceso de registro de Modelos con exito.');
        $this->command->info(" Registros creados: $countDeviceModels");
        $this->command->info('---------------------------------------------------');
    }
}
