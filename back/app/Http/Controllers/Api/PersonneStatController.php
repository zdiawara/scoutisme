<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Nature;
use App\Http\Controllers\Controller;
use App\Http\Services\PersonneStatService;
use App\Models\Organisation;
use App\Models\TypeOrganisation;
use Illuminate\Support\Facades\DB;

class PersonneStatController extends Controller
{


    private PersonneStatService $personneStatService;

    public function __construct(PersonneStatService $personneStatService)
    {
        $this->personneStatService = $personneStatService;
    }

    public function statByRegion()
    {

        $data = collect(DB::select("SELECT
                parent.nom,
                parent.id,
                SUM(
                    CASE
                        WHEN nb_scouts.nb IS NOT NULL THEN nb_scouts.nb
                        ELSE 0
                    END
                ) as nbscout,
                nb_scouts.type_id
            FROM organisations parent
            INNER JOIN natures n_parent on n_parent.id = parent.nature_id
            INNER JOIN (
                SELECT
                    o.id AS orga_id,
                    tuo.id AS type_id,
                    COUNT(p.id) AS nb,
                    o.parents AS parents
                FROM personnes p
                    INNER JOIN organisations o on o.id = p.organisation_id
                    INNER JOIN types_organisations tuo on tuo.id = o.type_id
                    INNER JOIN natures n on n.id = o.nature_id
                WHERE
                    n.code = 'unite'
                    AND p.type = 'scout'
                    AND tuo.nature_id = n.id
                GROUP BY
                    o.id,
                    tuo.id
            ) nb_scouts ON JSON_CONTAINS(JSON_EXTRACT(nb_scouts.parents, '$[*].id'), CONCAT('\"', parent.id, '\"') ) = 1
            WHERE n_parent.code = 'region'
            GROUP BY parent.id, nb_scouts.type_id", []));

        $typesOrganisations = TypeOrganisation::whereHas('nature', function ($q) {
            $q->where('code', Nature::UNITE);
        })->orderBy('position', 'asc')
            ->get();

        $items = Organisation::whereHas('nature', function ($q) {
            $q->where('code', Nature::REGION);
        })->get()
            ->map(function ($organisation) use ($typesOrganisations, $data) {


                $sums =  $typesOrganisations->reduce(function ($prev, $typeOrganisation) use ($data, $organisation) {
                    $sum = $data->filter(function ($item) use ($typeOrganisation, $organisation) {
                        return $item->type_id === $typeOrganisation->id && $item->id === $organisation->id;
                    })->map(function ($item) {
                        return $item->nbscout;
                    })->sum();
                    $prev[$typeOrganisation->code] = $sum;
                    return $prev;
                }, []);

                $cumul = collect($sums)->sum();

                return array_merge([
                    'nom' => $organisation->nom,
                    'id' => $organisation->id,
                    'cumul' => $cumul

                ], $sums);
            });


        return [
            'data' => $items,
            'headers' => array_merge(
                [[
                    'nom' => 'Région',
                    'code' => 'nom'
                ]],
                $typesOrganisations->map(function ($item) {
                    return [
                        'nom' => $item->membre,
                        'code' => $item->code
                    ];
                })->toArray(),
                [[
                    'nom' => 'Effectif',
                    'code' => 'cumul'
                ]]
            )
        ];
    }

    public function scoutByGenre()
    {

        $data = collect(DB::select("SELECT
                parent.id as organisation_id,
                enfant.type_id as type_id,
                SUM(CASE WHEN g.code = 'h' THEN 1 ELSE 0 END) as nombre_homme,
                SUM(CASE WHEN g.code = 'f' THEN 1 ELSE 0 END) as nombre_femme
            FROM
                organisations parent
                INNER JOIN organisations enfant on JSON_CONTAINS(JSON_EXTRACT(enfant.parents, '$[*].id'), CONCAT('\"', parent.id, '\"') ) = 1
                INNER JOIN attributions a on a.organisation_id = enfant.id
                INNER JOIN personnes p on p.id = a.personne_id
                INNER JOIN fonctions f on f.id = a.fonction_id
                INNER JOIN genres g on g.id = p.genre_id
                INNER JOIN natures n on n.id = parent.nature_id
            WHERE
                f.code = 'scout'AND
                n.code = 'region' AND 
                year(a.date_debut) <= 2024 AND 
                (a.date_fin is NULL or YEAR(a.date_fin) = 2024)
            GROUP BY parent.id, enfant.type_id", []));

        $typesOrganisations = TypeOrganisation::whereHas('nature', function ($q) {
            $q->where('code', Nature::UNITE);
        })->orderBy('position', 'asc')
            ->get();

        $items = Organisation::whereHas('nature', function ($q) {
            $q->where('code', 'region');
        })->get()
            ->map(function ($organisation) use ($typesOrganisations, $data) {

                $lines =  $typesOrganisations->reduce(function ($prev, $typeOrganisation) use ($data, $organisation) {
                    $orgs = $data->filter(function ($item) use ($typeOrganisation, $organisation) {
                        return $item->type_id == $typeOrganisation->id &&
                            $item->organisation_id == $organisation->id;
                    });

                    $prev[$typeOrganisation->code] = [
                        'homme' => $orgs->map(fn ($item) => $item->nombre_homme)->sum(),
                        'femme' => $orgs->map(fn ($item) => $item->nombre_femme)->sum(),
                    ];
                    return $prev;
                }, []);

                $cumul = collect($lines)->reduce(function ($prev, $item) {
                    $prev['homme'] += $item['homme'];
                    $prev['femme'] += $item['femme'];
                    return $prev;
                }, ['homme' => 0, 'femme' => 0]);

                return array_merge([
                    'nom' => $organisation->nom,
                    'id' => $organisation->id,
                    'cumul' => $cumul
                ], $lines);
            });

        return [
            'data' => $items,
            'headers' => array_merge(
                [['nom' => 'Région', 'code' => 'nom']],
                $typesOrganisations->map(fn ($item) => ['nom' => $item->membre, 'code' => $item->code])->toArray(),
                [['nom' => 'Effectif', 'code' => 'cumul']]
            ),
            'headers_2' => array_merge(
                $typesOrganisations->flatMap(fn ($item) => [
                    ['nom' => "Homme", 'code' => $item->id . "_homme"],
                    ['nom' => "Femme", 'code' => $item->id . "_femme"]
                ])->toArray(),
                [['nom' => 'Total homme', 'code' => 'effectif_homme']],
                [['nom' => 'Total femme', 'code' => 'effectif_femme']]
            )
        ];
    }

    public function cotisationScoutByRegion()
    {
        return $this->personneStatService->cotisationByScoutAndRegion();
    }
}
