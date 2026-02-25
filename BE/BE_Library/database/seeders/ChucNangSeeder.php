<?php

namespace Database\Seeders;

use App\Models\ChucNang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChucNangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ChucNang::insert([
            ['ten_chuc_nang' => 'Quan ly sach'],
            ['ten_chuc_nang' => 'Quan ly nguoi muon'],
        ]);
    }
}
