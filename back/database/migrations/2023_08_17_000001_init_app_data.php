<?php

use App\Helpers\Modules;
use App\Http\Services\FonctionService;
use App\Models\Fonction;
use App\Models\Fonctionnalite;
use App\Models\Genre;
use App\Models\Module;
use App\Models\Nature;
use App\Models\NatureCotisation;
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
        Nature::create(['nom' => 'Unité', 'code' => 'unite']);
        Nature::create(['nom' => 'Groupe', 'code' => 'groupe']);
        Nature::create(['nom' => 'Région', 'code' => 'region']);
        Nature::create(['nom' => 'National', 'code' => 'national']);

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
        // national
        TypeOrganisation::create(['nom' => 'Meute', 'code' => 'meute', 'position' => 1, 'membre' => 'Louveteaux', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Troupe', 'code' => 'troupe', 'position' => 2, 'membre' => 'Eclaireurs', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Communauté', 'code' => 'communaute', 'position' => 3, 'membre' => 'Sinkiés', 'nature_id' => $unite->id]);
        TypeOrganisation::create(['nom' => 'Dièklou', 'code' => 'dieklou', 'position' => 4, 'membre' => 'Routiers', 'nature_id' => $unite->id]);
        // unité
        TypeOrganisation::create(['nom' => 'Conseil national', 'code' => 'conseil_national', 'position' => 1, 'membre' => 'Conseil national', 'nature_id' => $national->id]);
        TypeOrganisation::create(['nom' => 'Equipe nationale', 'code' => 'equipe_nationale', 'position' => 2, 'membre' => 'Equipe national', 'nature_id' => $national->id]);

        // montants cotisations
        NatureCotisation::create([
            'nature_id' => $unite->id,
            'type' => 'scout',
            'profil' => 'type_organisation',
            'montants' => [
                ['id' => TypeOrganisation::where('code', 'meute')->first()->id, 'value' => 3000],
                ['id' => TypeOrganisation::where('code', 'communaute')->first()->id, 'value' => 4000],
                ['id' => TypeOrganisation::where('code', 'dieklou')->first()->id, 'value' => 5000],
                ['id' => TypeOrganisation::where('code', 'troupe')->first()->id, 'value' => 2000],
            ]
        ]);

        NatureCotisation::create([
            'nature_id' => $unite->id,
            'type' => 'direction',
            'profil' => 'fonction',
            'montants' => Fonction::where('code', '!=', 'scout')
                ->where('nature_id', $unite->id)
                ->get()->map(fn ($fonction) => [
                    'id' => $fonction->id,
                    'value' => 0
                ])->all()
        ]);

        collect([Modules::PERSONNE, Modules::ORGANISATION])
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
        $module = Module::create(collect($body)->except('fonctionnalites')->toArray());
        collect($body["fonctionnalites"])->each(function ($item) use ($module) {
            Fonctionnalite::create(array_merge($item, [
                'module_id' => $module->id
            ]));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
