<?php

use App\Helpers\Modules;
use App\Http\Services\FonctionService;
use App\Models\Fonction;
use App\Models\Fonctionnalite;
use App\Models\Genre;
use App\Models\Module;
use App\Models\Nature;
use App\Models\MontantCotisation;
use App\Models\Organisation;
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

        $this->insertReferentiels();

        $this->insertTypeOrganisations();

        $this->insertFonctions();

        collect(json_decode(file_get_contents(storage_path() . "/bf.json"), true))
            ->each(function ($ville) {
                Ville::create(['nom' => $ville['city']]);
            });

        $this->insertOrganisationNationals();

        $this->insertOrganisationRegionaux();

        $this->insertMontantCotisations();

        $this->insertHabilitations();
    }

    private function insertReferentiels()
    {
        // Nature des organisations
        collect([
            ['nom' => 'Unité', 'code' => 'unite'],
            ['nom' => 'Groupe', 'code' => 'groupe'],
            ['nom' => 'Région', 'code' => 'region'],
            ['nom' => 'National', 'code' => 'national']
        ])->each(function ($data) {
            Nature::create($data);
        });

        collect([
            ['nom' => 'Homme', 'code' => 'h'],
            ['nom' => 'Femme', 'code' => 'f']
        ])->each(function ($item) {
            Genre::create($item);
        });
    }

    private function insertTypeOrganisations()
    {
        // Création des types organisations pour les organisations de nature unité & national
        $unite = Nature::where('code', 'unite')->get()->first();
        $national = Nature::where('code', 'national')->get()->first();
        // unité
        TypeOrganisation::create(['nom' => 'Meute', 'code' => 'meute', 'position' => 1, 'membre' => 'Louveteau', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Troupe', 'code' => 'troupe', 'position' => 2, 'membre' => 'Eclaireur', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Communauté', 'code' => 'communaute', 'position' => 3, 'membre' => 'Sinkié', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Dièklou', 'code' => 'dieklou', 'position' => 4, 'membre' => 'Routier', 'nature_id' => $unite->id]);
        // national
        TypeOrganisation::create(['nom' => 'Conseil national', 'code' => 'conseil_national', 'position' => 1, 'membre' => 'Conseil national', 'nature_id' => $national->id]);
        TypeOrganisation::create(['nom' => 'Equipe nationale', 'code' => 'equipe_nationale', 'position' => 2, 'membre' => 'Equipe national', 'nature_id' => $national->id]);
    }

    private function insertFonctions()
    {

        $unite = Nature::where('code', 'unite')->firstOrFail();
        $groupe = Nature::where('code', 'groupe')->firstOrFail();
        $region = Nature::where('code', 'region')->firstOrFail();
        $national = Nature::where('code', 'national')->firstOrFail();


        // Création de la fonction scout
        Fonction::create(['nom' => 'Scout', 'code' => 'scout', 'nature_id' => Nature::where('code', 'unite')->first()->id]);

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

        $typeEquipeNationale = TypeOrganisation::where('code', 'equipe_nationale')->firstOrFail();

        collect([
            "Commissaire général",
            "Commissaire général adjoint. chargé des relations internationales",
            "Commissaire national à la gestion financière et du patrimoine",
            "Commissaire national au programme des jeunes",
            "Commissaire national à la formation et aux ressources adultes",
            "Commissaire national au secrétariat et à la communication",
            "Commissaire national aux scoutismes confessionnels"
        ])->each(function ($item) use ($national, $typeEquipeNationale) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $national->id, 'type_id' => $typeEquipeNationale->id]);
        });

        $typeConseilNational = TypeOrganisation::where('code', 'conseil_national')->firstOrFail();
        collect([
            "Président",
            "Vice président",
        ])->each(function ($item) use ($national, $typeConseilNational) {
            $this->fonctionService->create(['nom' => $item, 'nature_id' => $national->id, 'type_id' => $typeConseilNational->id]);
        });
    }

    private function insertHabilitations()
    {
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

    private function insertMontantCotisations()
    {
        // montants cotisations des scouts
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
    }

    private function insertOrganisationNationals()
    {
        $natureConseil = Nature::where('code', 'national')
            ->firstOrFail();

        $conseilNational = Organisation::create([
            'nom' => 'Conseil national',
            'code' => 'cna',
            'nature_id' => $natureConseil->id,
            'type_id' => TypeOrganisation::where('code', 'conseil_national')
                ->firstOrFail()
                ->id
        ]);

        Organisation::create([
            'nom' => 'Equipe nationale',
            'code' => 'ena',
            'nature_id' => $natureConseil->id,
            'parent_id' => $conseilNational->id,
            'type_id' => TypeOrganisation::where('code', 'equipe_nationale')
                ->firstOrFail()
                ->id
        ]);
    }

    private function insertOrganisationRegionaux()
    {
        $typeId = TypeOrganisation::where('code', 'equipe_nationale')
            ->firstOrFail()
            ->id;

        $equipeNationale = Organisation::where('type_id', $typeId)->firstOrFail();

        $natureRegion = Nature::where('code', 'region')
            ->firstOrFail();

        collect([
            ['nom' => 'Boucle du Mouhoun', 'code' => 'bmo'],
            ['nom' => 'Cascades', 'code' => 'cas'],
            ['nom' => 'Centre', 'code' => 'cen'],
            ['nom' => 'Centre-Est', 'code' => 'ces'],
            ['nom' => 'Centre-Nord', 'code' => 'cno'],
            ['nom' => 'Centre-Ouest', 'code' => 'cou'],
            ['nom' => 'Centre-Sud', 'code' => 'csu'],
            ['nom' => 'Est', 'code' => 'est'],
            ['nom' => 'Hauts-Bassins', 'code' => 'hba'],
            ['nom' => 'Nord', 'code' => 'nor'],
            ['nom' => 'Plateau central', 'code' => 'pce'],
            ['nom' => 'Sahel', 'code' => 'sah'],
            ['nom' => 'Sud-Ouest', 'code' => 'sou'],
        ])->each(function ($item) use ($equipeNationale, $natureRegion) {
            Organisation::create(array_merge($item, [
                'nature_id' => $natureRegion->id,
                'parent_id' => $equipeNationale->id
            ]));
        });
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
