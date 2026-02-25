<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            NguoiMuonSeeder::class,
            TheLoaiSeeder::class,
            KeSachSeeder::class,
            NhaXuatBanSeeder::class,
            TacGiaSeeder::class,
            ChucVuSeeder::class,
            ChucNangSeeder::class,
            AdminSeeder::class,
            ChucVuChucNangSeeder::class,
            SachSeeder::class,
            PhieuMuonSeeder::class,
            ChiTietMuonSeeder::class,
            TienPhatSeeder::class,
        ]);
    }
}
