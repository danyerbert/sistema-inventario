<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EquipmentSummarySheet implements FromCollection, WithHeadings, WithStyles
{
    public function __construct(private Collection $equipos) {}

    public function collection()
    {
        $resumen = $this->equipos
            ->groupBy(fn ($e) => $e->typeOfEquipment->type_of_equipment)
            ->map->count()
            ->sortDesc();

        $filas = $resumen->map(fn ($cantidad, $tipo) => [$tipo, $cantidad])->values();

        return $filas->push(['Total', $this->equipos->count()]);
    }

    public function headings(): array
    {
        return ['Tipo de equipo', 'Cantidad'];
    }

    public function styles(Worksheet $sheet)
    {
        return ['1' => ['font' => ['bold' => true]]];
    }
}
