<?php

namespace Database\Seeders;

use App\Models\ChiTietMuon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChiTietMuonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ChiTietMuon::insert([
            [
                'id_sach' => 1,
                'id_phieu_muon' => 1,
                'han_gia' => now()->addDays(7),
            ]
        ]);
    }
}
