<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $primaryKey = 'id_brand';

    protected $fillable = ['name_brand'];

    public function deviceModels()
    {
        return $this->hasMany(DeviceModel::class, 'id_brand', 'id_brand');
    }
}
