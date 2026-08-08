<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentDetail extends Model
{
    protected $table = 'equipment_details';

    protected $primaryKey = 'id_equipment_details';

    protected $fillable = [
        'property_number', 'serial', 'observaciones',
        'id_type_of_equipment', 'id_brand', 'id_workstation', 'id_operational_status',
    ];

    public function typeOfEquipment()
    {
        return $this->belongsTo(TypeOfEquipment::class, 'id_type_of_equipment', 'id_type_of_equipment');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'id_brand', 'id_brand');
    }

    public function workstation()
    {
        return $this->belongsTo(Workstation::class, 'id_workstation', 'id_workstation');
    }

    public function operationalStatus()
    {
        return $this->belongsTo(OperationalStatus::class, 'id_operational_status', 'id_operational_status');
    }
}
