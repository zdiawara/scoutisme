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
        Schema::create('types_organisations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('code')->unique();
            $table->timestamps();
        });
        Schema::create('natures', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('code')->unique();
            $table->timestamps();
        });
        Schema::create('ref_formations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->timestamps();
        });
        Schema::create('villes', function (Blueprint $table) {
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
            $table->uuid('type_id')->nullable();
            $table->uuid('nature_id');
            $table->uuid('ville_id');
            $table->timestamps();

            $table->foreign('type_id')->references('id')->on('types_organisations');
            $table->foreign('nature_id')->references('id')->on('natures');
            $table->foreign('ville_id')->references('id')->on('villes');
        });
        Schema::table('organisations', function (Blueprint $table) {
            $table->uuid('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('organisations');
        });
        Schema::create('personnes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('prenom');
            $table->integer('etat')->default(1); // actif = 1 , inactif = 0
            $table->string('code')->unique();
            $table->string('email')->unique();
            $table->string('telephone')->nullable();
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('profession')->nullable();
            $table->string('type'); // scout; adulte
            $table->json('personne_a_contacter')->nullable();
            $table->uuid('niveau_formation_id')->nullable();
            $table->uuid('ville_id');
            $table->string('adresse')->nullable();
            $table->timestamps();

            $table->foreign('ville_id')->references('id')->on('villes');
            $table->foreign('niveau_formation_id')->references('id')->on('ref_formations');
        });
        DB::statement("ALTER TABLE personnes ADD photo MEDIUMBLOB NULL AFTER prenom");
        Schema::create('fonctions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string('code')->unique();
            $table->integer('duree_mandat')->nullable();
            $table->uuid('nature_id')->nullable();
            $table->timestamps();

            $table->foreign('nature_id')->references('id')->on('natures');
        });
        Schema::create('attributions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('organisation_id');
            $table->uuid('personne_id');
            $table->uuid('fonction_id');
            $table->dateTime('date_debut');
            $table->dateTime('date_fin')->nullable();
            $table->timestamps();

            $table->foreign('organisation_id')->references('id')->on('organisations');
            $table->foreign('personne_id')->references('id')->on('personnes');
            $table->foreign('fonction_id')->references('id')->on('fonctions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        collect(['attributions', 'fonctions', 'personnes', 'organisations', 'types_organisations', 'natures'])
            ->each(function ($table) {
                Schema::dropIfExists($table);
            });
    }
};
