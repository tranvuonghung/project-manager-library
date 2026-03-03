<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChiTietMuon extends Model
{
    use HasFactory;

    protected $table = 'chi_tiet_muons';

    protected $fillable = [
        'han_gia',
        'ngay_tra',
        'tien_phat',
        'id_sach',
        'id_phieu_muon',
    ];

    public $timestamps = false;
    public function sach()
    {
        return $this->belongsTo(Sach::class, 'id_sach');
    }

    public function phieuMuon()
    {
        return $this->belongsTo(PhieuMuon::class, 'id_phieu_muon');
    }
}
