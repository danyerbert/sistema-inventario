<?php

namespace App\Http\Controllers;

use App\Exports\EquipmentExport;
use App\Models\EquipmentDetail;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class EquipmentExportController extends Controller
{
    private function filteredEquipos(Request $request)
    {
        return EquipmentDetail::with(['typeOfEquipment', 'brand', 'workstation', 'operationalStatus'])
            ->when($request->search, function ($q, $search) {
                $q->where('property_number', 'like', "%{$search}%")
                  ->orWhere('serial', 'like', "%{$search}%");
            })
            ->when($request->id_operational_status, fn ($q, $v) => $q->where('id_operational_status', $v))
            ->when($request->id_type_of_equipment, fn ($q, $v) => $q->where('id_type_of_equipment', $v))
            ->get();
    }

    public function pdf(Request $request)
    {
        $equipos = $this->filteredEquipos($request);

        $resumen = $equipos
            ->groupBy(fn ($e) => $e->typeOfEquipment->type_of_equipment)
            ->map->count()
            ->sortDesc();

        $pdf = Pdf::loadView('exports.equipment-pdf', [
            'equipos' => $equipos,
            'resumen' => $resumen,
            'total' => $equipos->count(),
        ])->setPaper('a4', 'landscape');

        return $pdf->download('inventario-equipos-' . now()->format('Y-m-d') . '.pdf');
    }

    public function excel(Request $request)
    {
        $equipos = $this->filteredEquipos($request);

        return Excel::download(
            new EquipmentExport($equipos),
            'inventario-equipos-' . now()->format('Y-m-d') . '.xlsx'
        );
    }
}
