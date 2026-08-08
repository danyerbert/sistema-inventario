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
        Schema::create('device_models', function (Blueprint $table) {
            $table->id('id_model');
            $table->string('name_model', 120);
            $table->foreignId('id_brand')
                ->constrained('brands', 'id_brand')
                ->restrictOnDelete();
            $table->foreignId('id_type_of_equipment')
                ->constrained('type_of_equipment', 'id_type_of_equipment')
                ->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('device_models');
    }
};
