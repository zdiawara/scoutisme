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

        collect([
            "BANK" => [
                "groupes" => [
                    [
                        "nom" => "Dinizulu",
                        "code" => "DIN",
                        "unites" => [
                            ["nom" => "Babemba", "code" => "BAB"],
                        ]
                    ]
                ]
            ],
            "DJOR" => [
                "groupes" => [
                    [
                        "nom" => "Saint Pierre de Gounghin",
                        "code" => "SPG",
                        "unites" => [
                            ["nom" => "Tagafet", "code" => "TAG"],
                        ]
                    ]
                ]
            ],
            "GOUL" => [
                "unites" => [["nom" => "Charles Lwang", "code" => "CHL"]]
            ],
            "GUIR" => [
                "unites" => [["nom" => "Nelson Mandela", "code" => "NEM"]]
            ],
            "KADI" => [
                "unites" => [["nom" => "Boli bama", "code" => "BOB"]]
            ],
            "KUIL" => [
                "unites" => [["nom" => "Guimbi Ouattara", "code" => "GUO"]]
            ],
            "LIPT" => [
                "unites" => [["nom" => "Luteur King", "code" => "LKI"]]
            ],
            "NAKA" => [
                "unites" => [["nom" => "Léopold Sédar Senghor", "code" => "LSS"]]
            ],
            "NAND" => [
                "unites" => [["nom" => "Balaie", "code" => "BAL"]]
            ],
            "NAZI" => [
                "unites" => [["nom" => "Thomas Sang", "code" => "THS"]]
            ],
            "OUBR" => [
                "unites" => [["nom" => "Diaba Lompo", "code" => "DIL"]]
            ],
            "SIRB" => [
                "unites" => [["nom" => "Fanga", "code" => "FAN"]]
            ],
            "SOUM" => [
                "unites" => [["nom" => "Soundiata Keita", "code" => "SOK"]]
            ],
            "SOUR" => [
                "unites" => [["nom" => "Massa", "code" => "MAS"]]
            ],
            "TANN" => [
                "unites" => [["nom" => "Mebo", "code" => "MAS"]]
            ],
            "TAPO" => [
                "unites" => [["nom" => "VDP", "code" => "MAS"]]
            ],
            "YAAD" => [
                "unites" => [["nom" => "Faso Bara", "code" => "MAS"]]
            ]
        ])->each(function ($region, $codeOrganisation) {

            $organisation = Organisation::where('code', $codeOrganisation)
                ->firstOrFail();

            $types = TypeOrganisation::whereHas('nature', function ($q) {
                $q->where('code', 'unite');
            })->get();

            $natureUnite = Nature::where('code', 'unite')
                ->firstOrFail();

            if (isset($region["unites"])) {
                collect($region["unites"])->each(function ($item) use ($organisation, $types, $natureUnite) {
                    $this->organisationService->create(array_merge($item, [
                        'parent_id' => $organisation->id,
                        'nature_id' => $natureUnite->id,
                        "type_id" => $types->random()->id
                    ]));
                });
            }

            if (isset($region["groupes"])) {
                collect($region["groupes"])->each(function ($groupe) use ($organisation, $types, $natureUnite) {
                    $groupeOrganisation = $this->organisationService->create(collect($groupe)->except('unites')
                        ->merge(['parent_id' => $organisation->id, 'nature_id' => Nature::where('code', 'groupe')
                            ->firstOrFail()->id])
                        ->toArray());

                    if (isset($groupe["unites"])) {
                        collect($groupe["unites"])->each(function ($unite) use ($groupeOrganisation, $types, $natureUnite) {
                            $this->organisationService->create(array_merge($unite, [
                                'parent_id' => $groupeOrganisation->id,
                                'nature_id' => $natureUnite->id,
                                "type_id" => $types->random()->id
                            ]));
                        });
                    }
                });
            }


            /*$nbUnite = fake()->numberBetween(2, 6);

            for ($j = 0; $j <= $nbUnite; $j++) {
                $this->organisationService->create([
                    'nom' => 'U - ' . fake()->unique(true, 100000)->word(),
                    'nature_id' => $natureUnite->id,
                    'parent_id' => $organisation->id,
                    'type_id' => $types->random()->id,
                    'code' => fake()->unique()->numerify('###') . $j,
                ]);
            }*/
        });
    }
}
