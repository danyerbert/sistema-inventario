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
        Schema::table('equipment_details', function (Blueprint $table) {
            $table->string('property_number', 120)->nullable()->change();
            $table->string('serial', 200)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('equipment_details', function (Blueprint $table) {
            $table->string('property_number', 120)->nullable(false)->change();
            $table->string('serial', 200)->nullable(false)->change();
        });
    }
};
