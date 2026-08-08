<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EquipmentSheet implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function __construct(private Collection $equipos) {}

    public function collection()
    {
        return $this->equipos;
    }

    public function headings(): array
    {
        return ['N° Bien', 'Tipo', 'Marca', 'Serial', 'Puesto', 'Estatus', 'Observaciones'];
    }

    public function map($equipo): array
    {
        return [
            $equipo->property_number ?? 'N/P',
            $equipo->typeOfEquipment->type_of_equipment,
            $equipo->brand->name_brand,
            $equipo->serial ?? 'N/P',
            $equipo->workstation->number_workstation ?? '—',
            $equipo->operationalStatus->operational_status,
            $equipo->observaciones,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return ['1' => ['font' => ['bold' => true]]];
    }
}
