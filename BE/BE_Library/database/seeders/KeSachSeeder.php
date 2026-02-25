<?php

namespace Database\Seeders;

use App\Models\KeSach;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KeSachSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KeSach::insert([
            ['ten_ke' => 'Ke A', 'vi_tri' => 'Tang 1'],
            ['ten_ke' => 'Ke B', 'vi_tri' => 'Tang 2'],
        ]);
    }
}
