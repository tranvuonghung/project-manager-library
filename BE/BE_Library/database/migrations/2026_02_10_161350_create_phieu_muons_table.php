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
        Schema::create('phieu_muons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_nguoi_muon')->constrained('nguoi_muons');
            $table->foreignId('id_admin')->nullable()->constrained('admins');
            $table->string('id_quan_ly')->nullable();
            $table->date('ngay_muon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phieu_muons');
    }
};
