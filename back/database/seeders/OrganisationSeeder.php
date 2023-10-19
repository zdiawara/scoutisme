<?php

namespace Database\Seeders;

use App\Http\Services\OrganisationService;
use App\Models\Nature;
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
            $region = $this->organisationService->create([
                'nom' => $item,
                'nature_id' => $natureRegion->id,
                'parent_id' => $equipeNational->id
            ]);

            $types = TypeOrganisation::all();

            $natureGroupe = Nature::where('code', 'groupe')
                ->firstOrFail();

            $nb = fake()->numberBetween(4, 10);

            for ($i = 0; $i <= $nb; $i++) {
                $groupe = $this->organisationService->create([
                    'nom' => 'G - ' . fake()->unique(true, 100000)->word(),
                    'nature_id' => $natureGroupe->id,
                    'parent_id' => $region->id
                ]);

                $nbUnite = fake()->numberBetween(2, 6);

                $natureUnite = Nature::where('code', 'unite')
                    ->firstOrFail();

                for ($j = 0; $j <= $nbUnite; $j++) {
                    $this->organisationService->create([
                        'nom' => 'U - ' . fake()->unique(true, 100000)->word(),
                        'nature_id' => $natureUnite->id,
                        'parent_id' => $groupe->id,
                        'type_id' => $types->random()->id,
                    ]);
                }
            }
        });
    }
}
