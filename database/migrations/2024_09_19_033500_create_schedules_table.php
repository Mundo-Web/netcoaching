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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->char('agreement_id', 36)->index();
            $table->unsignedBigInteger('coach_id'); // users
            $table->unsignedBigInteger('coachee_id'); // users
            $table->string('name');
            $table->dateTime('session_date');
            $table->boolean('completed')->default(false);
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();

            $table->foreign('agreement_id')->references('id')->on('agreements')->cascadeOnDelete();
            $table->foreign('coach_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('coachee_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
