<?php

namespace Database\Seeders;

use App\Models\Attribution;
use App\Models\Organisation;
use App\Models\Personne;
use App\Models\Fonction;
use Illuminate\Database\Seeder;

class PersonneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Personne::factory()
            ->count(50)
            ->sequence(
                ['etat' => '0'],
                ['etat' => '1'],
            )
            ->sequence(
                ['type' => 'scout'],
                ['type' => 'adulte'],
            )
            ->create()
            ->each(function ($personne) {
                if ($personne->type === 'adulte') {
                    Attribution::create([
                        'personne_id' => $personne->id,
                        'fonction_id' => Fonction::all()->random()->id,
                        'organisation_id' => Organisation::whereHas('nature', function ($q) {
                            $q->where('code', '<>', 'unite');
                        })->get()->random()->id,
                        'date_debut' => now()
                    ]);
                }
            });
    }
}
