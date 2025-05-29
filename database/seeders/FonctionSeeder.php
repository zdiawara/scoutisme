<?php

namespace Database\Seeders;

use App\Http\Services\FonctionService;
use App\Models\Nature;
use Illuminate\Database\Seeder;

class FonctionSeeder extends Seeder
{

    private FonctionService $fonctionService;

    public function __construct(FonctionService $fonctionService)
    {
        $this->fonctionService = $fonctionService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groupe = Nature::where('code', 'groupe')
            ->firstOrFail();

        $unite = Nature::where('code', 'unite')
            ->firstOrFail();

        $region = Nature::where('code', 'region')
            ->firstOrFail();

        $national = Nature::where('code', 'national')
            ->firstOrFail();


        collect([
            "Chef d'unité",
            "Adj. chef d'unité",
            "Chargé de la trésorerie",
            "Chargé de l'information",
            "Secrétaire",
        ])->each(function ($item) use ($unite) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $unite->id]);
        });

        collect([
            "Chef de groupe",
            "Conseiller de groupe",
        ])->each(function ($item) use ($groupe) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $groupe->id]);
        });

        collect([
            'Commissaire régional',
            'Com. rég. adj. chargé du secrétariat',
            'Com. rég. gestion financière et du patrimoine',
            'Com. rég. communication',
            'Com. rég. programme des jeunes',
            'Com. rég. formation et aux ressources adultes',
            'Com. rég. scoutismes confessionnels'
        ])->each(function ($item) use ($region) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $region->id]);
        });

        collect([
            "Commissaire général",
            "Commissaire général adjoint. chargé des relations internationales",
            "Commissaire national à la gestion financière et du patrimoine",
            "Commissaire national au programme des jeunes",
            "Commissaire national à la formation et aux ressources adultes",
            "Commissaire national au secrétariat et à la communication",
            "Commissaire national aux scoutismes confessionnels"
        ])->each(function ($item) use ($national) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $national->id]);
        });
    }
}
