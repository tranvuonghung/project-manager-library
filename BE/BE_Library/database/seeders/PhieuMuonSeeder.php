<?php

namespace Database\Seeders;

use App\Models\PhieuMuon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PhieuMuonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PhieuMuon::insert([
            [
                'id_nguoi_muon' => 1,
                'id_admin' => 1,
                'ngay_muon' => now(),
            ]
        ]);
    }
}
