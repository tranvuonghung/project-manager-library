<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chi_tiet_muons', function (Blueprint $table) {
            $table->id();
            $table->date('han_gia')->nullable();
            $table->date('ngay_tra')->nullable();
            $table->decimal('tien_phat', 10, 2)->default(0);
            $table->foreignId('id_sach')->constrained('sachs');
            $table->foreignId('id_phieu_muon')->constrained('phieu_muons');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chi_tiet_muons');
    }
};
