<?php
namespace App\Exports;

use App\Models\EquipmentDetail;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EquipmentSheet implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function __construct(private Collection $equipos)
    {
    }

    public function collection()
    {
        return $this->equipos;
    }

    public function headings(): array
    {
        return ['N° inventario', 'Tipo', 'Marca', 'Serial', 'Puesto', 'Estado', 'Observaciones'];
    }

    public function map($equipo): array
    {
        return [
            $equipo->property_number,
            $equipo->typeOfEquipment->type_of_equipment,
            $equipo->brand->name_brand,
            $equipo->serial,
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