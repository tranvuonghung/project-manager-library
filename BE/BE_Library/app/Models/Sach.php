<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class Sach extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'sachs';

    protected $fillable = [
        'ten_sach',
        'nam_xuat_ban',
        'gia',
        'mo_ta',
        'hinh_anh',
        'id_the_loai',
        'id_ke_sach',
        'id_nha_xuat_ban',
        'id_tac_gia',
    ];
}
