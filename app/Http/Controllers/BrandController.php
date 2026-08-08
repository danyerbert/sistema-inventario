<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $brands = Brand::when($request->search, fn ($q, $s) => $q->where('name_brand', 'like', "%{$s}%"))
            ->orderBy('name_brand')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Brands/Index', [
            'brands' => $brands,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Brands/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_brand' => ['required', 'string', 'max:120', 'unique:brands,name_brand'],
        ]);

        Brand::create($data);

        return redirect()->route('brands.index')->with('success', 'Marca creada correctamente.');
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Brands/Edit', ['brand' => $brand]);
    }

    public function update(Request $request, Brand $brand)
    {
        $data = $request->validate([
            'name_brand' => ['required', 'string', 'max:120', "unique:brands,name_brand,{$brand->id_brand},id_brand"],
        ]);

        $brand->update($data);

        return redirect()->route('brands.index')->with('success', 'Marca actualizada.');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();

        return redirect()->route('brands.index')->with('success', 'Marca eliminada.');
    }
}
