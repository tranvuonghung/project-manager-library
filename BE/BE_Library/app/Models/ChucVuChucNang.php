<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class ChucVuChucNang extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'cv_vs_cns';

    protected $fillable = [
        'id_chuc_vu',
        'id_chuc_nang',
    ];
}
