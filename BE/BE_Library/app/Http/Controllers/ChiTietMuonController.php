<?php

namespace App\Http\Controllers;

use App\Models\ChiTietMuon;
use Illuminate\Http\Request;
use Carbon\Carbon;


class ChiTietMuonController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        $data['han_gia'] = Carbon::now()->addDays(7)->format('Y-m-d');

        $data['ngay_tra'] = null;
        $data['tien_phat'] = 0;

        ChiTietMuon::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Mượn sách thành công'
        ]);
    }
}
