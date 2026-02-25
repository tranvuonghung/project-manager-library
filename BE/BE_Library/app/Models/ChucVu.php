<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class ChucVu extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'chuc_vus';

    protected $fillable = [
        'ten_chuc_vu',
        'tinh_trang',
    ];
}
