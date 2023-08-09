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
            $table->string('code')->unique();
            $table->timestamps();
        });
        Schema::create('organisations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('code')->unique();
            $table->integer('etat')->default(1); // actif = 1 , inactif = 0
            $table->json('adresse')->nullable();
            $table->uuid('type_organisation_id');
            $table->timestamps();

            $table->foreign('type_organisation_id')->references('id')->on('types_organisations');
        });
        Schema::table('organisations', function (Blueprint $table) {
            $table->uuid('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('organisations');
        });
        Schema::create('scouts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('prenom');
            $table->integer('etat')->default(1); // actif = 1 , inactif = 0
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
        Schema::create('scout_organisations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('scout_id');
            $table->uuid('role_id');
            $table->dateTime('date_debut');
            $table->dateTime('date_fin')->nullable();
            $table->timestamps();

            $table->foreign('organisation_id')->references('id')->on('organisations');
            $table->foreign('scout_id')->references('id')->on('scouts');
            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        collect(['scout_organisations', 'roles', 'scouts', 'organisations', 'types_organisations'])
            ->each(function ($table) {
                Schema::dropIfExists($table);
            });
    }
};
