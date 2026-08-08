<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipment_details', function (Blueprint $table) {
            $table->id('id_equipment_details');
            $table->string('property_number', 120);
            $table->string('serial', 200);
            $table->text('observaciones')->nullable();
            $table->foreignId('id_type_of_equipment')
                ->constrained('type_of_equipment', 'id_type_of_equipment');
            $table->foreignId('id_brand')
                ->constrained('brands', 'id_brand');
            $table->foreignId('id_workstation')
                ->nullable()
                ->constrained('workstations', 'id_workstation');
            $table->foreignId('id_operational_status')
                ->constrained('operational_statuses', 'id_operational_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_details');
    }
};
