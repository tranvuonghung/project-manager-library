<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
class TheLoai extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'the_loais';

    protected $fillable = [
        'ten_the_loai',
    ];
}
