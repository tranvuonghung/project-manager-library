<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::insert([
            [
                'ho_ten' => 'Admin Tong',
                'email' => 'admin@gmail.com',
                'mat_khau' => bcrypt('123456'),
                'id_chuc_vu' => 1,
            ]
        ]);
    }
}
