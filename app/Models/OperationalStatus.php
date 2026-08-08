<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OperationalStatus extends Model
{
    protected $table = 'operational_statuses'; // ajustado al nombre real

    protected $primaryKey = 'id_operational_status';

    protected $fillable = ['operational_status'];

    public function equipmentDetails()
    {
        return $this->hasMany(EquipmentDetail::class, 'id_operational_status', 'id_operational_status');
    }
}
