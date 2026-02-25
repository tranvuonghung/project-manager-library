<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class NguoiMuon extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'nguoi_muons';

    protected $fillable = [
        'ho_ten',
        'ngay_sinh',
        'gioi_tinh',
        'so_dien_thoai',
        'email',
        'password',
        'dia_chi',
        'ngay_dang_ky',
        'ngay_het_han',
    ];
}
