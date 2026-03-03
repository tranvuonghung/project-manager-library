<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sach extends Model
{
    use HasFactory;

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
    public function theLoai()
    {
        return $this->belongsTo(TheLoai::class, 'id_the_loai');
    }

    public function tacGia()
    {
        return $this->belongsTo(TacGia::class, 'id_tac_gia');
    }

    public function nhaXuatBan()
    {
        return $this->belongsTo(NhaXuatBan::class, 'id_nha_xuat_ban');
    }

    public function keSach()
    {
        return $this->belongsTo(KeSach::class, 'id_ke_sach');
    }
}
