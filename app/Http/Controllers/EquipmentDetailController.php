<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentDetailRequest;
use App\Http\Requests\UpdateEquipmentDetailRequest;
use App\Models\Brand;
use App\Models\EquipmentDetail;
use App\Models\OperationalStatus;
use App\Models\TypeOfEquipment;
use App\Models\Workstation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentDetailController extends Controller
{
    public function index(Request $request)
    {
        $equipos = EquipmentDetail::with(['typeOfEquipment', 'brand', 'workstation', 'operationalStatus'])
            ->when($request->search, function ($query, $search) {
                $query->where('property_number', 'like', "%{$search}%")
                    ->orWhere('serial', 'like', "%{$search}%");
            })
            ->when($request->id_operational_status, fn ($q, $v) => $q->where('id_operational_status', $v))
            ->when($request->id_type_of_equipment, fn ($q, $v) => $q->where('id_type_of_equipment', $v))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Equipment/Index', [
            'equipos' => $equipos,
            'filters' => $request->only(['search', 'id_operational_status', 'id_type_of_equipment']),
            'tiposEquipo' => TypeOfEquipment::all(),
            'estados' => OperationalStatus::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Equipment/Create', [
            'tiposEquipo' => TypeOfEquipment::all(),
            'marcas' => Brand::all(),
            'estados' => OperationalStatus::all(),
        ]);
    }

    public function store(StoreEquipmentDetailRequest $request)
    {
        $data = $request->validated();
        $data['id_workstation'] = $this->resolveWorkstationId($data['number_workstation'] ?? null);
        unset($data['number_workstation']);

        EquipmentDetail::create($data);

        return redirect()->route('equipment.index')->with('success', 'Equipo registrado correctamente.');
    }

    public function edit(EquipmentDetail $equipment)
    {
        return Inertia::render('Equipment/Edit', [
            'equipo' => $equipment,
            'tiposEquipo' => TypeOfEquipment::all(),
            'marcas' => Brand::all(),
            'estados' => OperationalStatus::all(),
        ]);
    }

    public function update(UpdateEquipmentDetailRequest $request, EquipmentDetail $equipment)
    {
        $data = $request->validated();
        $data['id_workstation'] = $this->resolveWorkstationId($data['number_workstation'] ?? null);
        unset($data['number_workstation']);

        $equipment->update($data);

        return redirect()->route('equipment.index')->with('success', 'Equipo actualizado correctamente.');
    }

    public function destroy(EquipmentDetail $equipment)
    {
        $equipment->delete();

        return redirect()->route('equipment.index')->with('success', 'Equipo eliminado.');
    }

    private function resolveWorkstationId(?string $numberWorkstation): ?int
    {
        if (empty($numberWorkstation)) {
            return null;
        }

        return Workstation::firstOrCreate(['number_workstation' => $numberWorkstation])->id_workstation;
    }
}
