<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class TienPhat extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'tien_phats';

    protected $fillable = [
        'id_nguoi_dung',
        'so_tien',
        'ngay_thanh_toan',
        'ly_do',
    ];
}
