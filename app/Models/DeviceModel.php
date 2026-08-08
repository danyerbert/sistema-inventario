<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceModel extends Model
{
    protected $table = 'device_models';

    protected $primaryKey = 'id_model';

    protected $fillable = ['name_model', 'id_brand', 'id_type_of_equipment'];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'id_brand', 'id_brand');
    }

    public function typeOfEquipment()
    {
        return $this->belongsTo(TypeOfEquipment::class, 'id_type_of_equipment', 'id_type_of_equipment');
    }
}
