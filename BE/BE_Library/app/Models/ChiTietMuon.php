<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class ChiTietMuon extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'chi_tiet_muons';

    protected $fillable = [
        'han_gia',
        'ngay_tra',
        'tien_phat',
        'id_sach',
        'id_phieu_muon',
    ];
}
