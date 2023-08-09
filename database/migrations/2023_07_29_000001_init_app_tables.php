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
        Schema::create('types_organisations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('code');
            $table->timestamps();
        });
        Schema::create('organisations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('code')->unique();
            $table->uuid('type_organisation_id');
            $table->json('adresse')->nullable();
            $table->timestamps();

            $table->foreign('type_organisation_id')->references('id')->on('types_organisations');
        });
        Schema::create('personnes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('prenom');
            $table->string('code')->unique();
            $table->string('email')->unique();
            $table->json('telephones')->nullable();
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
        Schema::create('roles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('code')->unique();
            $table->uuid('type_organisation_id');
            $table->timestamps();

            $table->foreign('type_organisation_id')->references('id')->on('types_organisations');
        });
        Schema::create('attributions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('personne_id');
            $table->uuid('role_id');
            $table->timestamps();

            $table->foreign('organisation_id')->references('id')->on('organisations');
            $table->foreign('personne_id')->references('id')->on('personnes');
            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        collect(['attributions', 'roles', 'personnes', 'organisations', 'types_organisations'])
            ->each(function ($table) {
                Schema::dropIfExists($table);
            });
    }
};
