<?php

namespace Database\Seeders;

use App\Models\Nature;
use App\Models\Fonction;
use Illuminate\Database\Seeder;

class FonctionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groupe = Nature::where('code', 'groupe')
            ->firstOrFail();
        $unite = Nature::where('code', 'unite')
            ->firstOrFail();

        Fonction::create(['nom' => "Chef d'unité", 'code' => 'chef_unite', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Adjoint au chef d'unité", 'code' => 'adj_chef_unite', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Chargé de la trésorerie", 'code' => 'charge_tresorie', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Chargé de l'information", 'code' => 'charge_info', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Secrétaire", 'code' => 'secretaire', 'nature_id' => $unite->id]);
        Fonction::create(['nom' => "Conseiller de groupe", 'code' => 'conseiller_groupe', 'nature_id' => $groupe->id]);
    }
}
