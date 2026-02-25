<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class TacGia extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'tac_gias';

    protected $fillable = [
        'ten_tac_gia',
        'tieu_su',
    ];
}
