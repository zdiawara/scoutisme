<?php

namespace Database\Seeders;

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
        $typeUnite = TypeOrganisation::where('code', 'unite')
            ->firstOrFail();

        $typeGroupe = TypeOrganisation::where('code', 'groupe')
            ->firstOrFail();

        $groupe1 = Organisation::create([
            'nom' => 'Groupe 1',
            'code' => '220800',
            'type_organisation_id' => $typeGroupe->id,
        ]);

        Organisation::create([
            'nom' => 'Fama',
            'code' => '220802',
            'type_organisation_id' => $typeUnite->id,
            'parent_id' => $groupe1->id,
        ]);

        Organisation::create([
            'nom' => 'Tagafet',
            'code' => '220803',
            'type_organisation_id' => $typeUnite->id,
            'parent_id' => $groupe1->id,
        ]);

        Organisation::create([
            'nom' => 'Balaie',
            'code' => '221000',
            'type_organisation_id' => $typeUnite->id,
            'parent_id' => $groupe1->id,
        ]);
    }
}
