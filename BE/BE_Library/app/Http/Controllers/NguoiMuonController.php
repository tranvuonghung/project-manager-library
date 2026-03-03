<?php

namespace App\Http\Controllers;

use App\Models\Sach;
use Illuminate\Http\Request;

class NguoiMuonController extends Controller
{
    public function showSach($id)
    {
        $sach = Sach::with('tacGia')->find($id);

        if (!$sach) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy sách'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $sach
        ]);
    }
    public function trangChu()
    {
        $sach = Sach::with('tacGia')
            ->latest()
            ->get();

        return response()->json([
            'status' => true,
            'data' => $sach
        ]);
    }
}
