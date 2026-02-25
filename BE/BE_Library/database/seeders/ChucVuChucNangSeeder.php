<?php

namespace Database\Seeders;

use App\Models\ChucVuChucNang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChucVuChucNangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ChucVuChucNang::insert([
            ['id_chuc_vu' => 1, 'id_chuc_nang' => 1],
            ['id_chuc_vu' => 1, 'id_chuc_nang' => 2],
        ]);
    }
}
