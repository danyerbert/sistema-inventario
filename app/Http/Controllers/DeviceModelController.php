<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\DeviceModel;
use App\Models\TypeOfEquipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeviceModelController extends Controller
{
    public function index(Request $request)
    {
        $modelos = DeviceModel::with(['brand', 'typeOfEquipment'])
            ->when($request->search, fn ($q, $s) => $q->where('name_model', 'like', "%{$s}%"))
            ->when($request->id_brand, fn ($q, $v) => $q->where('id_brand', $v))
            ->when($request->id_type_of_equipment, fn ($q, $v) => $q->where('id_type_of_equipment', $v))
            ->orderBy('name_model')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Models/Index', [
            'modelos' => $modelos,
            'filters' => $request->only(['search', 'id_brand', 'id_type_of_equipment']),
            'marcas' => Brand::all(),
            'tiposEquipo' => TypeOfEquipment::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Models/Create', [
            'marcas' => Brand::all(),
            'tiposEquipo' => TypeOfEquipment::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_model' => ['required', 'string', 'max:120'],
            'id_brand' => ['required', 'exists:brands,id_brand'],
            'id_type_of_equipment' => ['required', 'exists:type_of_equipment,id_type_of_equipment'],
        ]);

        DeviceModel::create($data);

        return redirect()->route('models.index')->with('success', 'Modelo creado correctamente.');
    }

    public function edit(DeviceModel $model)
    {
        return Inertia::render('Models/Edit', [
            'modelo' => $model,
            'marcas' => Brand::all(),
            'tiposEquipo' => TypeOfEquipment::all(),
        ]);
    }

    public function update(Request $request, DeviceModel $model)
    {
        $data = $request->validate([
            'name_model' => ['required', 'string', 'max:120'],
            'id_brand' => ['required', 'exists:brands,id_brand'],
            'id_type_of_equipment' => ['required', 'exists:type_of_equipment,id_type_of_equipment'],
        ]);

        $model->update($data);

        return redirect()->route('models.index')->with('success', 'Modelo actualizado.');
    }

    public function destroy(DeviceModel $model)
    {
        $model->delete();

        return redirect()->route('models.index')->with('success', 'Modelo eliminado.');
    }
}
