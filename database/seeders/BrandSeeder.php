<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $marcas = [
            'Logitech', 'HP', 'Dell', 'Lenovo', 'Samsung',
            'LG', 'Redragon', 'Genius', 'Microsoft',
        ];
        $countBrands = 0;
        foreach ($marcas as $marca) {
            Brand::firstOrCreate(['name_brand' => $marca]);
            $countBrands++;
        }

        $this->command->info('-------------------------------------------------');
        $this->command->info(' Proceso de registro de Marcas con exito.');
        $this->command->info(" Registros creados: $countBrands");
        $this->command->info('---------------------------------------------------');
    }
}
