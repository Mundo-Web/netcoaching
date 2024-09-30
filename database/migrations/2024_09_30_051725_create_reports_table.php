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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('schedule_id');
            $table->char('agreement_id', 36)->index();
            $table->integer('duration');
            $table->integer('reprogrammed')->default(0);
            $table->boolean('was_attended')->default(true);
            $table->boolean('was_comfortable')->default(true);
            $table->boolean('was_performed')->default(true);
            $table->timestamps();

            $table->foreign('schedule_id')->references('id')->on('schedules')->cascadeOnDelete();
            $table->foreign('agreement_id')->references('id')->on('agreements')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
