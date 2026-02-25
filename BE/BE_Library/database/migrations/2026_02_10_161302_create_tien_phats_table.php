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
        Schema::create('tien_phats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_nguoi_dung')->constrained('nguoi_muons');
            $table->decimal('so_tien', 10, 2);
            $table->date('ngay_thanh_toan')->nullable();
            $table->string('ly_do')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tien_phats');
    }
};
