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
        Schema::create('cv_vs_cns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_chuc_vu')->constrained('chuc_vus');
            $table->foreignId('id_chuc_nang')->constrained('chuc_nangs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_vs_cns');
    }
};
