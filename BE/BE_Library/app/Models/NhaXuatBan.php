<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class NhaXuatBan extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'nha_xuat_bans';

    protected $fillable = [
        'ten_nxb',
        'dia_chi',
        'sdt',
    ];
}
