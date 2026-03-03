<?php

use App\Http\Controllers\ChiTietMuonController;
use App\Http\Controllers\NguoiMuonController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'nguoi_muon'], function () {
    // trang chủ người mượn sách
    Route::get('/trang-chu/data', [NguoiMuonController::class, 'trangChu']);
    Route::get('/sach/{id}', [NguoiMuonController::class, 'showSach']);
    Route::post('/chi-tiet-muon', [ChiTietMuonController::class, 'store']);
});
