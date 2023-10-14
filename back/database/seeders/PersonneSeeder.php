<?php

namespace Database\Seeders;

use App\Http\Services\AttributionService;
use App\Http\Services\PersonneService;
use App\Models\Organisation;
use App\Models\Personne;
use App\Models\Fonction;
use App\Models\Genre;
use Illuminate\Database\Seeder;

class PersonneSeeder extends Seeder
{

    private AttributionService $attributionService;
    private PersonneService $personneService;

    public function __construct(AttributionService $attributionService, PersonneService $personneService)
    {
        $this->attributionService = $attributionService;
        $this->personneService = $personneService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Fonction::all()
            ->each(function ($fonction) {
                if ($fonction->code === 'scout') {
                    Organisation::select('organisations.*')
                        ->join('natures as n', function ($q) {
                            $q->on('n.id', 'organisations.nature_id');
                        })
                        ->where('n.code', 'unite')
                        ->get()
                        ->each(function ($organisation) use ($fonction) {
                            Personne::factory()
                                ->count(rand(10, 30))
                                ->make()
                                ->each(function ($personne) use ($organisation, $fonction) {
                                    $personne->type = 'scout';
                                    $personne->genre_id = Genre::all()->random()->id;
                                    $personneCreated = $this->personneService->create($personne->toArray());
                                    $this->attributionService->create([
                                        'organisation_id' => $organisation->id,
                                        'personne_id' => $personneCreated->id,
                                        'fonction_id' => $fonction->id,
                                        'date_debut' => now(),
                                        'type' => 'scout'
                                    ]);
                                });
                        });
                } else {
                    Organisation::where('nature_id', $fonction->nature_id)
                        ->get()
                        ->each(function ($organisation) use ($fonction) {
                            Personne::factory()
                                ->count(1)
                                ->make()
                                ->each(function ($personne) use ($organisation, $fonction) {
                                    $personne->type = 'scout';
                                    $personne->genre_id = Genre::all()->random()->id;
                                    $personneCreated = $this->personneService->create($personne->toArray());
                                    $this->attributionService->create([
                                        'organisation_id' => $organisation->id,
                                        'personne_id' => $personneCreated->id,
                                        'fonction_id' => $fonction->id,
                                        'date_debut' => now(),
                                        'type' => 'direction'
                                    ]);
                                });
                        });
                }
            });

        /* Personne::factory()
            ->count(1000)
            ->create()
            ->each(function ($personne) use ($natures, $fonctions) {

                $body = collect([
                    'personne_id' => $personne->id,
                    'date_debut' => now()
                ]);

                $nature

                if ($personne->type === 'adulte') {
                    $body->push(['fonction_id' => Fonction::all()->random()->id]);

                    $body = [
                        'fonction_id' => Fonction::all()->random()->id,
                        'organisation_id' => Organisation::whereHas('nature', function ($q) {
                            $q->where('code', '<>', 'unite');
                        })->get()->random()->id,
                    ];
                } else {
                    $body = []
                }

                $this->attributionService->create($body);
            }); */
    }
}
