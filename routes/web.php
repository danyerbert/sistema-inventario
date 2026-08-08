<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\EquipmentDetailController;
use App\Http\Controllers\EquipmentExportController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

//Route::inertia('/', 'welcome')->name('home');
Route::redirect('/', '/login')->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    //Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/equipment/export/pdf', [EquipmentExportController::class, 'pdf'])
        ->middleware('permission:equipment.export')->name('equipment.export.pdf');
    Route::get('/equipment/export/excel', [EquipmentExportController::class, 'excel'])
        ->middleware('permission:equipment.export')->name('equipment.export.excel');

    Route::get('/equipment', [EquipmentDetailController::class, 'index'])
        ->middleware('permission:equipment.view')->name('equipment.index');
    Route::get('/equipment/create', [EquipmentDetailController::class, 'create'])
        ->middleware('permission:equipment.create')->name('equipment.create');
    Route::post('/equipment', [EquipmentDetailController::class, 'store'])
        ->middleware('permission:equipment.create')->name('equipment.store');
    Route::get('/equipment/{equipment}/edit', [EquipmentDetailController::class, 'edit'])
        ->middleware('permission:equipment.edit')->name('equipment.edit');
    Route::put('/equipment/{equipment}', [EquipmentDetailController::class, 'update'])
        ->middleware('permission:equipment.edit')->name('equipment.update');
    Route::delete('/equipment/{equipment}', [EquipmentDetailController::class, 'destroy'])
        ->middleware('permission:equipment.delete')->name('equipment.destroy');

    Route::resource('brands', BrandController::class)->except('show')
        ->middleware('permission:brands.manage');

    Route::middleware('permission:users.manage')->group(function () {
        Route::resource('users', UserController::class)->except('show');
    });
});

require __DIR__.'/settings.php';
