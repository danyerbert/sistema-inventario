<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class EquipmentExport implements WithMultipleSheets
{
    public function __construct(private Collection $equipos) {}

    public function sheets(): array
    {
        return [
            'Inventario' => new EquipmentSheet($this->equipos),
            'Resumen por tipo' => new EquipmentSummarySheet($this->equipos),
        ];
    }
}
