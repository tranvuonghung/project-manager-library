<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    
    protected $table = 'admins';

    protected $fillable = [
        'ho_ten',
        'so_dien_thoai',
        'email',
        'mat_khau',
        'tinh_trang',
        'id_chuc_vu',
    ];
}
