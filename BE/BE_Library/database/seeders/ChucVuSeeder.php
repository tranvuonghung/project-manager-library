<?php

namespace Database\Seeders;

use App\Models\ChucVu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChucVuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ChucVu::insert([
            ['ten_chuc_vu' => 'Admin'],
            ['ten_chuc_vu' => 'Nhan Vien'],
        ]);
    }
}
