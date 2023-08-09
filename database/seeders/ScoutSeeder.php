<?php

namespace Database\Seeders;

use App\Models\Organisation;
use App\Models\Role;
use App\Models\Scout;
use App\Models\ScoutOrganisation;
use App\Models\TypeOrganisation;
use Illuminate\Database\Seeder;

class ScoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Scout::factory()
            ->count(50)
            ->sequence(
                ['etat' => '0'],
                ['etat' => '1'],
            )->create()
            ->each(function ($scout) {
                ScoutOrganisation::create([
                    'scout_id' => $scout->id,
                    'role_id' => Role::all()->random()->id,
                    'organisation_id' => Organisation::whereHas('typeOrganisation', function ($q) {
                        $q->where('code', 'unite');
                    })->get()->random()->id,
                    'date_debut' => now()
                ]);
            });
    }
}
