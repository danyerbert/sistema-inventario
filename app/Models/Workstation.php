<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workstation extends Model
{
    protected $table = 'workstations';

    protected $primaryKey = 'id_workstation';

    protected $fillable = [
        'number_workstation',
    ];
}
