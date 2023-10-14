<?php

namespace Database\Seeders;

use App\Http\Services\OrganisationService;
use App\Models\Nature;
use App\Models\Organisation;
use App\Models\TypeOrganisation;
use Illuminate\Database\Seeder;

class OrganisationSeeder extends Seeder
{

    private OrganisationService $organisationService;

    public function __construct(OrganisationService $organisationService)
    {
        $this->organisationService = $organisationService;
    }


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $natureConseil = Nature::where('code', 'national')
            ->firstOrFail();

        $natureRegion = Nature::where('code', 'region')
            ->firstOrFail();

        $natureUnite = Nature::where('code', 'unite')
            ->firstOrFail();

        $natureGroupe = Nature::where('code', 'groupe')
            ->firstOrFail();


        $conseilNational = $this->organisationService->create([
            'nom' => 'Conseil national',
            'nature_id' => $natureConseil->id
        ]);

        $equipeNational = $this->organisationService->create([
            'nom' => 'Equipe nationale',
            'nature_id' => $natureConseil->id,
            'parent_id' => $conseilNational->id
        ]);

        collect([
            'Boucle du Mouhoun',
            'Cascades',
            'Centre',
            'Centre-Est',
            'Centre-Nord',
            'Centre-Ouest',
            'Centre-Sud',
            'Est',
            'Hauts-Bassins',
            'Nord',
            'Plateau central',
            'Sahel',
            'Sud-Ouest',
        ])->each(function ($item) use ($equipeNational, $natureRegion) {
            $equipeNational = $this->organisationService->create([
                'nom' => $item,
                'nature_id' => $natureRegion->id,
                'parent_id' => $equipeNational->id
            ]);
        });

        $regionHautBassin = Organisation::where('nom', 'Hauts-Bassins')
            ->firstOrFail();



        $groupe1 = $this->organisationService->create([
            'nom' => 'Nelson M.',
            'nature_id' => $natureGroupe->id,
            'parent_id' => $regionHautBassin->id
        ]);

        $groupe2 = $this->organisationService->create([
            'nom' => 'Luteur King',
            'nature_id' => $natureGroupe->id,
            'parent_id' => $regionHautBassin->id
        ]);

        $types = TypeOrganisation::all();

        $this->organisationService->create([
            'nom' => 'Fama',
            'type_id' => $types->random()->id,
            'nature_id' => $natureUnite->id,
            'parent_id' => $groupe1->id,
        ]);

        $this->organisationService->create([
            'nom' => 'Tagafet',
            'nature_id' => $natureUnite->id,
            'parent_id' => $groupe2->id,
            'type_id' => $types->random()->id,
        ]);

        $this->organisationService->create([
            'nom' => 'Balaie',
            'nature_id' => $natureUnite->id,
            'parent_id' => $groupe1->id,
            'type_id' => $types->random()->id,
        ]);

        $this->organisationService->create([
            'nom' => 'Zama',
            'nature_id' => $natureUnite->id,
            'parent_id' => $regionHautBassin->id,
            'type_id' => $types->random()->id,
        ]);
    }
}
