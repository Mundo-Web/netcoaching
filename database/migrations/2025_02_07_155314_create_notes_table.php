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
        Schema::create('notes', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->string('attachment')->nullable();

            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('schedule_id')->constrained('schedules');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
