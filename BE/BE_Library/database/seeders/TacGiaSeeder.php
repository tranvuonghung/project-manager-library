<?php

namespace Database\Seeders;

use App\Models\TacGia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TacGiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TacGia::insert([
            ['ten_tac_gia' => 'Nguyễn Nhật Ánh'],
            ['ten_tac_gia' => 'Tô Hoài'],
            ['ten_tac_gia' => 'Paulo Coelho'],
            ['ten_tac_gia' => 'Dale Carnegie'],
            ['ten_tac_gia' => 'Rosie Nguyễn'],
            ['ten_tac_gia' => 'J.K. Rowling'],
            ['ten_tac_gia' => 'Arthur Conan Doyle'],
            ['ten_tac_gia' => 'Yuval Noah Harari'],
            ['ten_tac_gia' => 'James Clear'],
            ['ten_tac_gia' => 'Napoleon Hill'],
        ]);
    }
}
