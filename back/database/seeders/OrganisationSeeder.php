<?php

namespace Database\Seeders;

use App\Models\Nature;
use App\Models\Organisation;
use App\Models\TypeOrganisation;
use Illuminate\Database\Seeder;

class OrganisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $natureUnite = Nature::where('code', 'unite')
            ->firstOrFail();

        $natureGroupe = Nature::where('code', 'groupe')
            ->firstOrFail();

        $groupe1 = Organisation::create([
            'nom' => 'Haut bassins',
            'code' => '220840',
            'nature_id' => Nature::where('code', 'groupe')
                ->firstOrFail()->id
        ]);

        $groupe1 = Organisation::create([
            'nom' => 'Groupe 1',
            'code' => '220800',
            'nature_id' => $natureGroupe->id,
        ]);

        $types = TypeOrganisation::all();

        Organisation::create([
            'nom' => 'Fama',
            'code' => '220802',
            'type_id' => $types->random()->id,
            'nature_id' => $natureUnite->id,
            'parent_id' => $groupe1->id,
        ]);

        Organisation::create([
            'nom' => 'Tagafet',
            'code' => '220803',
            'nature_id' => $natureUnite->id,
            'parent_id' => $groupe1->id,
            'type_id' => $types->random()->id,
        ]);

        Organisation::create([
            'nom' => 'Balaie',
            'code' => '221000',
            'nature_id' => $natureUnite->id,
            'parent_id' => $groupe1->id,
            'type_id' => $types->random()->id,
        ]);
    }
}
