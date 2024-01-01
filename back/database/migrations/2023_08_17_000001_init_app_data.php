<?php

use App\Helpers\Modules;
use App\Http\Services\FonctionService;
use App\Models\Fonction;
use App\Models\Fonctionnalite;
use App\Models\Genre;
use App\Models\Module;
use App\Models\Nature;
use App\Models\MontantCotisation;
use App\Models\Role;
use App\Models\TypeOrganisation;
use App\Models\User;
use App\Models\Ville;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    private FonctionService $fonctionService;

    public function __construct()
    {
        $this->fonctionService = new FonctionService();
    }
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Nature des organisations
        $unite = Nature::create(['nom' => 'Unité', 'code' => 'unite']);
        $groupe = Nature::create(['nom' => 'Groupe', 'code' => 'groupe']);
        $region = Nature::create(['nom' => 'Région', 'code' => 'region']);
        $national = Nature::create(['nom' => 'National', 'code' => 'national']);

        collect([
            "Chef d'unité",
            "Adj. chef d'unité",
            "Chargé de la trésorerie",
            "Chargé de l'information",
            "Secrétaire",
        ])->each(function ($item) use ($unite) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $unite->id, 'duree_mandat' => 1]);
        });

        collect([
            "Conseiller de groupe",
        ])->each(function ($item) use ($groupe) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $groupe->id, 'duree_mandat' => 1]);
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

        // Insertion des genres
        Genre::create(['nom' => 'Homme', 'code' => 'h']);
        Genre::create(['nom' => 'Femme', 'code' => 'f']);

        // Insertion des villes 
        $villes = json_decode(file_get_contents(storage_path() . "/bf.json"), true);
        collect($villes)->each(function ($ville) {
            Ville::create(['nom' => $ville['city']]);
        });

        // Création de la fonction scout
        Fonction::create(['nom' => 'Scout', 'code' => 'scout', 'nature_id' => Nature::where('code', 'unite')->first()->id]);

        // Création des types organisations pour les organisations de nature unité & national
        $unite = Nature::where('code', 'unite')->get()->first();
        $national = Nature::where('code', 'national')->get()->first();
        // unité
        TypeOrganisation::create(['nom' => 'Meute', 'code' => 'meute', 'position' => 1, 'membre' => 'Louveteaux', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Troupe', 'code' => 'troupe', 'position' => 2, 'membre' => 'Eclaireurs', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Communauté', 'code' => 'communaute', 'position' => 3, 'membre' => 'Sinkiés', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Dièklou', 'code' => 'dieklou', 'position' => 4, 'membre' => 'Routiers', 'nature_id' => $unite->id]);
        // national
        TypeOrganisation::create(['nom' => 'Conseil national', 'code' => 'conseil_national', 'position' => 1, 'membre' => 'Conseil national', 'nature_id' => $national->id]);
        TypeOrganisation::create(['nom' => 'Equipe nationale', 'code' => 'equipe_nationale', 'position' => 2, 'membre' => 'Equipe national', 'nature_id' => $national->id]);

        // montants cotisations
        MontantCotisation::create([
            'type' => 'scout',
            'profil' => 'type_organisation',
            'montants' => [
                ['id' => TypeOrganisation::where('code', 'meute')->first()->id, 'value' => 500],
                ['id' => TypeOrganisation::where('code', 'troupe')->first()->id, 'value' => 1000],
                ['id' => TypeOrganisation::where('code', 'communaute')->first()->id, 'value' => 2000],
                ['id' => TypeOrganisation::where('code', 'dieklou')->first()->id, 'value' => 3000],
            ]
        ]);

        MontantCotisation::create([
            'type' => 'direction_unite',
            'profil' => 'tous',
            'montants' => [["value" => 3000]]
        ]);

        MontantCotisation::create([
            'type' => 'direction_groupe',
            'profil' => 'tous',
            'montants' => [["value" => 4000]]
        ]);

        MontantCotisation::create([
            'type' => 'direction_region',
            'profil' => 'tous',
            'montants' => [["value" => 5000]]
        ]);

        MontantCotisation::create([
            'type' => 'direction_equipe_nationale',
            'profil' => 'tous',
            'montants' => [["value" => 10000]]
        ]);

        MontantCotisation::create([
            'type' => 'direction_conseil_national',
            'profil' => 'tous',
            'montants' => [["value" => 50000]]
        ]);


        collect([Modules::MODULE_PERSONNE, Modules::MODULE_ORGANISATION, Modules::MODULE_PAIEMENT, Modules::MODULE_MAIL])
            ->each(function ($item) {
                $this->createModuleWithFonctionnalities($item);
            });

        $roleAdmin = Role::create(['nom' => 'Administrateur', 'code' => 'admin', 'perimetres' => []]);

        User::create([
            'name' => 'Administrateur',
            'email' => 'admin@asbf.bf',
            'password' => bcrypt('secret'),
            'role_id' => $roleAdmin->id
        ]);
    }

    private function createModuleWithFonctionnalities(array $body): void
    {
        $module = Module::create(collect($body)->except('sous_modules')->toArray());

        collect($body["sous_modules"])->each(function ($item) use ($module) {

            $sousModule = Module::create(collect($item)
                ->except('fonctionnalites')
                ->merge([
                    'parent_id' => $module->id
                ])
                ->toArray());

            collect(collect($item)
                ->get('fonctionnalites'))
                ->each(function ($fonctionnalite) use ($sousModule) {
                    Fonctionnalite::create(array_merge($fonctionnalite, [
                        'module_id' => $sousModule->id
                    ]));
                });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
