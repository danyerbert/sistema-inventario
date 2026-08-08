<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeOfEquipment extends Model
{
    protected $table = 'type_of_equipment';

    protected $primaryKey = 'id_type_of_equipment';

    protected $fillable = [
        'type_of_equipment',
    ];

    public function equipmentDetails()
    {
        return $this->hasMany(EquipmentDetail::class, 'id_type_of_equipment', 'id_type_of_equipment');
    }
}
