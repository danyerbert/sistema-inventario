<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\EquipmentDetail;
use App\Models\OperationalStatus;
use App\Models\TypeOfEquipment;
use App\Models\Workstation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'totalEquipos' => EquipmentDetail::count(),
            'totalMarcas' => Brand::count(),
            'totalPuestos' => Workstation::count(),
            'porTipo' => TypeOfEquipment::withCount('equipmentDetails')
                ->orderByDesc('equipment_details_count')
                ->get(['id_type_of_equipment', 'type_of_equipment']),
            'porEstado' => OperationalStatus::withCount('equipmentDetails')
                ->orderByDesc('equipment_details_count')
                ->get(['id_operational_status', 'operational_status']),
            'ultimosEquipos' => EquipmentDetail::with(['typeOfEquipment', 'brand'])
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
