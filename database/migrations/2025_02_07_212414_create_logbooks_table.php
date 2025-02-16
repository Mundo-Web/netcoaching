<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logbooks', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->longText('topic')->nullable(); // Tema
            $table->longText('goal')->nullable(); // Lo que deseo es ...
            $table->longText('insight')->nullable(); // Me di cuenta de ...
            $table->longText('commitments')->nullable(); // Acciones a las cuales me comprometo
            $table->longText('status')->nullable(); // Avance o estatus

            $table->foreignId('schedule_id')->constrained('schedules');
            $table->foreignUuid('agreement_id')->constrained('agreements');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logbooks');
    }
};
