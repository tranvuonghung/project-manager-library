<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class ChucNang extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'chuc_nangs';

    protected $fillable = [
        'ten_chuc_nang',
    ];
}
