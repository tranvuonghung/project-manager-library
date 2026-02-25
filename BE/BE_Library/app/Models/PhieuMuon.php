<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class PhieuMuon extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'phieu_muons';

    protected $fillable = [
        'id_nguoi_muon',
        'id_quan_ly',
        'ngay_muon',
        'id_admin',
    ];
}
