<?php

use App\Models\Genre;
use App\Models\Nature;
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

        // Insertion des genres
        Genre::create(['nom' => 'Homme']);
        Genre::create(['nom' => 'Femme']);

        // Insertion des villes 
        $villes = json_decode(file_get_contents(storage_path() . "/bf.json"), true);
        collect($villes)->each(function ($ville) {
            Ville::create(['nom' => $ville['city']]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
