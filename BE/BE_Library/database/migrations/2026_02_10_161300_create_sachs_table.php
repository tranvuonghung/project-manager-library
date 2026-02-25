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
        Schema::create('sachs', function (Blueprint $table) {
            $table->id();
            $table->string('ten_sach');
            $table->year('nam_xuat_ban')->nullable();
            $table->decimal('gia', 10, 2)->default(0);
            $table->text('mo_ta')->nullable();
            $table->string('hinh_anh')->nullable();
            $table->foreignId('id_the_loai')->constrained('the_loais');
            $table->foreignId('id_ke_sach')->constrained('ke_sachs');
            $table->foreignId('id_nha_xuat_ban')->constrained('nha_xuat_bans');
            $table->foreignId('id_tac_gia')->constrained('tac_gias');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saches');
    }
};
