<?php

use App\Models\Fonction;
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

        ## Initialiser la liste des fonctions
        $groupe = Nature::where('code', 'groupe')->firstOrFail();
        $unite = Nature::where('code', 'unite')->firstOrFail();

        Fonction::create(['nom' => "Chef d'unité", 'code' => 'chef_unite', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Adjoint au chef d'unité", 'code' => 'adj_chef_unite']);
        Fonction::create(['nom' => "Chargé de la trésorerie", 'code' => 'charge_tresorie', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Chargé de l'information", 'code' => 'charge_info', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Conseiller de groupe", 'code' => 'conseiller_groupe', 'nature_id' => $groupe->id]);
        Fonction::create(['nom' => "Ajoint au conseiller de groupe", 'code' => 'adj_onseiller_groupe', 'nature_id' => $groupe->id]);
        Fonction::create(['nom' => "Sécretaire", 'code' => 'secretaire', 'nature_id' => $groupe->id]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
