<?php

namespace Database\Seeders;

use App\Models\TienPhat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TienPhatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TienPhat::insert([
            [
                'id_nguoi_dung' => 1,
                'so_tien' => 50000,
                'ly_do' => 'Tra sach tre',
                'ngay_thanh_toan' => now(),
            ]
        ]);
    }
}
