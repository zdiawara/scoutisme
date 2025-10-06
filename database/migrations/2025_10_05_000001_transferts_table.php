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

        Schema::create('transferts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('numero')->unique();
            $table->uuid('unite_depart_id');
            $table->uuid('unite_arrivee_id');
            $table->uuid('scout_id');

            $table->uuid('etat');

            $table->uuid('created_by')->nullable();
            $table->uuid('modified_by')->nullable();

            $table->timestamps();

            $table->foreign('unite_depart_id')->references('id')->on('organisations');
            $table->foreign('unite_destinatrice_id')->references('id')->on('organisations');
            $table->foreign('scout_id')->references('id')->on('personnes');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('modified_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        collect([
            'transferts'
        ])->each(function ($table) {
            Schema::dropIfExists($table);
        });
    }
};
