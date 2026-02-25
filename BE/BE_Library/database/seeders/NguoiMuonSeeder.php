<?php

namespace Database\Seeders;

use App\Models\NguoiMuon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NguoiMuonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NguoiMuon::insert([
            [
                'ho_ten' => 'Nguyen Van A',
                'ngay_sinh' => '2002-05-10',
                'gioi_tinh' => 'Nam',
                'so_dien_thoai' => '0901111111',
                'email' => 'a@gmail.com',
                'password' => bcrypt('123456'),
                'dia_chi' => 'Da Nang',
                'ngay_dang_ky' => now(),
                'ngay_het_han' => now()->addYear(),
            ],
            [
                'ho_ten' => 'Tran Thi B',
                'ngay_sinh' => '2003-07-20',
                'gioi_tinh' => 'Nu',
                'so_dien_thoai' => '0902222222',
                'email' => 'b@gmail.com',
                'password' => bcrypt('123456'),
                'dia_chi' => 'Quang Nam',
                'ngay_dang_ky' => now(),
                'ngay_het_han' => now()->addYear(),
            ]
        ]);
    }
}
