<?php

namespace Database\Seeders;

use App\Models\Sach;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SachSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sach::insert([
            [
                'ten_sach' => 'Cho Tôi Xin Một Vé đi Tuổi Thơ',
                'nam_xuat_ban' => 2008,
                'gia' => 120000,
                "mo_ta" => "Cho tôi xin một vé đi tuổi thơ là một trong những sáng tác thành công nhất của nhà văn Nguyễn Nhật Ánh. Truyện ngắn là hồi ức của nhân vật trữ tình “tôi”, kể về câu chuyện ấu thơ của một nhóm bạn thân thiết gồm 4 người: Tôi (cu Mùi), con Tí sún, con Tủn và thằng Hải cò. Trong đó, người kể chuyện là cu Mùi dưới hình thức kể song song của thằng cu Mùi lúc bé và nhận xét, đánh giá của ông Mùi khi đã gần 50 tuổi.",
                "hinh_anh" => "https://i1-giaitri.vnecdn.net/2018/03/20/cho-toi-xin-mot-ve-di-tuoi-tho-5327-1521549732.gif?w=0&h=0&q=100&dpr=2&fit=crop&s=AUlaAhHG3YbOce68VAN0dg&t=image",
                'id_the_loai' => 1,
                'id_ke_sach' => 1,
                'id_nha_xuat_ban' => 1,
                'id_tac_gia' => 1,
            ],
            [
                'ten_sach' => 'Dế mèn phiêu lưu ký ',
                'nam_xuat_ban' => 2000,
                'gia' => 90000,
                "mo_ta" => "Cuốn sách kể về hành trình khám phá thế giới của một cậu bé tên là Dế Mèn.",
                "hinh_anh" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUI3PSDQLIb1DALoKNTzzYrgRRNqpFYYFPkw&s",
                'id_the_loai' => 2,
                'id_ke_sach' => 2,
                'id_nha_xuat_ban' => 2,
                'id_tac_gia' => 2,
            ],
        ]);
    }
}
