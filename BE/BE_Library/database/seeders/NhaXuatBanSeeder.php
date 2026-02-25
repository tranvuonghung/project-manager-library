<?php

namespace Database\Seeders;

use App\Models\NhaXuatBan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NhaXuatBanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NhaXuatBan::insert([
            ['ten_nxb' => 'NXB Tre', 'dia_chi' => 'HCM', 'sdt' => '028111111'],
            ['ten_nxb' => 'NXB Kim Dong', 'dia_chi' => 'Ha Noi', 'sdt' => '024222222'],
        ]);
    }
}
