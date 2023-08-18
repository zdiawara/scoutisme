<?php

use App\Models\Nature;
use App\Models\RefFormation;
use App\Models\TypeOrganisation;
use App\Models\Ville;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Nature des organisations
        Nature::create(['nom' => 'Unité', 'code' => 'unite']);
        Nature::create(['nom' => 'Groupe', 'code' => 'groupe']);
        Nature::create(['nom' => 'Région', 'code' => 'region']);
        Nature::create(['nom' => 'National', 'code' => 'national']);

        // Insert Type organisation
        TypeOrganisation::create(['nom' => 'Meute', 'code' => 'meute']);
        TypeOrganisation::create(['nom' => 'Troupe', 'code' => 'troupe']);
        TypeOrganisation::create(['nom' => 'Communauté', 'code' => 'communaute']);
        TypeOrganisation::create(['nom' => 'Dièklou', 'code' => 'dieklou']);

        // Liste des villes
        Ville::create(['nom' => "Ouagadougu", 'code' => "ouaga"]);
        Ville::create(['nom' => "Banfora", 'code' => "banfora"]);
        Ville::create(['nom' => "Bobo Dioulasso", 'code' => "bobo"]);
        Ville::create(['nom' => "Koudougou", 'code' => "koudougou"]);

        // Liste des formations
        collect(["Badge de bois", "Formateur adjoint", "Formateur des formateurs"])->each(function ($nom) {
            RefFormation::create(['nom' => $nom]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
