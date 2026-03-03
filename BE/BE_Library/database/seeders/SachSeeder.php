<?php

namespace Database\Seeders;

use App\Models\KeSach;
use App\Models\NhaXuatBan;
use App\Models\Sach;
use App\Models\TacGia;
use App\Models\TheLoai;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SachSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'ten_sach' => 'Cho Tôi Xin Một Vé đi Tuổi Thơ',
                'nam_xuat_ban' => 2008,
                'gia' => 120000,
                'mo_ta' => 'Tác phẩm nổi tiếng của Nguyễn Nhật Ánh.',
                'hinh_anh' => 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_13462018_124654.jpg',
                'id_the_loai' => 1,
                'id_ke_sach' => 1,
                'id_nha_xuat_ban' => 1,
                'id_tac_gia' => 1,
            ],

            [
                'ten_sach' => 'Dế Mèn Phiêu Lưu Ký',
                'nam_xuat_ban' => 2000,
                'gia' => 90000,
                'mo_ta' => 'Tác phẩm kinh điển của Tô Hoài.',
                'hinh_anh' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRii1zDXI8sQdg7ryo_-F0k7omYuY-Szm9K9w&s',
                'id_the_loai' => 2,
                'id_ke_sach' => 1,
                'id_nha_xuat_ban' => 1,
                'id_tac_gia' => 2,
            ],

            [
                'ten_sach' => 'Nhà Giả Kim',
                'nam_xuat_ban' => 2013,
                'gia' => 110000,
                'mo_ta' => 'Hành trình đi tìm kho báu của Santiago.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=3',
                'id_the_loai' => 3,
                'id_ke_sach' => 2,
                'id_nha_xuat_ban' => 2,
                'id_tac_gia' => 3,
            ],

            [
                'ten_sach' => 'Đắc Nhân Tâm',
                'nam_xuat_ban' => 2015,
                'gia' => 150000,
                'mo_ta' => 'Nghệ thuật thu phục lòng người.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=4',
                'id_the_loai' => 4,
                'id_ke_sach' => 2,
                'id_nha_xuat_ban' => 2,
                'id_tac_gia' => 4,
            ],

            [
                'ten_sach' => 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
                'nam_xuat_ban' => 2017,
                'gia' => 100000,
                'mo_ta' => 'Cuốn sách truyền cảm hứng cho giới trẻ.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=5',
                'id_the_loai' => 4,
                'id_ke_sach' => 3,
                'id_nha_xuat_ban' => 3,
                'id_tac_gia' => 5,
            ],

            [
                'ten_sach' => 'Harry Potter Và Hòn Đá Phù Thủy',
                'nam_xuat_ban' => 1997,
                'gia' => 200000,
                'mo_ta' => 'Cậu bé phù thủy Harry Potter.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=6',
                'id_the_loai' => 5,
                'id_ke_sach' => 3,
                'id_nha_xuat_ban' => 3,
                'id_tac_gia' => 6,
            ],

            [
                'ten_sach' => 'Sherlock Holmes',
                'nam_xuat_ban' => 1990,
                'gia' => 130000,
                'mo_ta' => 'Những vụ án trinh thám nổi tiếng.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=7',
                'id_the_loai' => 6,
                'id_ke_sach' => 4,
                'id_nha_xuat_ban' => 4,
                'id_tac_gia' => 7,
            ],

            [
                'ten_sach' => 'Sapiens',
                'nam_xuat_ban' => 2014,
                'gia' => 180000,
                'mo_ta' => 'Lược sử loài người.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=8',
                'id_the_loai' => 7,
                'id_ke_sach' => 4,
                'id_nha_xuat_ban' => 5,
                'id_tac_gia' => 8,
            ],

            [
                'ten_sach' => 'Atomic Habits',
                'nam_xuat_ban' => 2018,
                'gia' => 170000,
                'mo_ta' => 'Xây dựng thói quen tốt.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=9',
                'id_the_loai' => 4,
                'id_ke_sach' => 5,
                'id_nha_xuat_ban' => 5,
                'id_tac_gia' => 9,
            ],

            [
                'ten_sach' => 'Think And Grow Rich',
                'nam_xuat_ban' => 1937,
                'gia' => 160000,
                'mo_ta' => 'Bí quyết thành công và làm giàu.',
                'hinh_anh' => 'https://picsum.photos/200/300?random=10',
                'id_the_loai' => 4,
                'id_ke_sach' => 5,
                'id_nha_xuat_ban' => 5,
                'id_tac_gia' => 10,
            ],

        ];

        foreach ($data as $item) {

            $item['id_the_loai'] = TheLoai::inRandomOrder()->first()->id;
            $item['id_ke_sach'] = KeSach::inRandomOrder()->first()->id;
            $item['id_nha_xuat_ban'] = NhaXuatBan::inRandomOrder()->first()->id;
            $item['id_tac_gia'] = TacGia::inRandomOrder()->first()->id;

            Sach::create($item);
        }
    }
}
