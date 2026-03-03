<?php

namespace Database\Seeders;

use App\Models\ChiTietMuon;
use Illuminate\Database\Seeder;

class ChiTietMuonSeeder extends Seeder
{
    public function run(): void
    {
        ChiTietMuon::insert([
            [
                'id_sach'       => 1,
                'id_phieu_muon' => 1,
                'han_gia'       => now()->addDays(7),
                'ngay_tra'      => null,
                'tien_phat'     => 0,
            ]
        ]);
    }
}
