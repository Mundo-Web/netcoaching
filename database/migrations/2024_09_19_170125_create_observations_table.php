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
        Schema::create('observations', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->char('agreement_id', 36)->index();
            $table->unsignedBigInteger('observer_id');
            $table->longText('description');
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();

            $table->foreign('agreement_id')->references('id')->on('agreements')->cascadeOnDelete();
            $table->foreign('observer_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('observations');
    }
};
