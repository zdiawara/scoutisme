<?php

namespace Database\Seeders;

use App\Http\Services\PersonneService;
use App\Models\Organisation;
use App\Models\Personne;
use App\Models\Fonction;
use App\Models\Genre;
use Illuminate\Database\Seeder;

class PersonneSeeder extends Seeder
{

    private PersonneService $personneService;

    public function __construct(PersonneService $personneService)
    {
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
                                ->count(rand(15, 30))
                                ->make()
                                ->each(function ($personne) use ($organisation, $fonction) {
                                    $personne->type = 'scout';
                                    $personne->genre_id = Genre::all()->random()->id;
                                    $this->personneService->create(array_merge($personne->toArray(), [
                                        "attribution" => [
                                            'organisation_id' => $organisation->id,
                                            'fonction_id' => $fonction->id,
                                            'date_debut' => now(),
                                        ]
                                    ]));
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
                                    $personne->type = 'adulte';
                                    $personne->genre_id = Genre::all()->random()->id;
                                    $this->personneService->create(array_merge($personne->toArray(), [
                                        "attribution" => [
                                            'organisation_id' => $organisation->id,
                                            'fonction_id' => $fonction->id,
                                            'date_debut' => now(),
                                        ]
                                    ]));
                                });
                        });
                }
            });
    }
}
