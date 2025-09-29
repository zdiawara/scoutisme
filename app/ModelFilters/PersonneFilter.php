<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PersonneFilter extends ModelFilter
{
    //protected $blacklist = ['secretMethod'];

    public function search($search)
    {
        return $this->where(function ($q) use ($search) {

            return $q->where('personnes.nom', 'LIKE', "%$search%")
                ->orWhere('personnes.prenom', 'LIKE', "%$search%")
                ->orWhere('personnes.code', 'LIKE', "%$search%");
        });
    }

    public function etat($value)
    {
        return $this->where('personnes.etat', $value);
    }

    public function age($value)
    {
        $values = explode("-", $value);

        $borneInf = null;
        $borneSup = null;
        $valeurExcate = null;

        if (sizeof($values) == 2 && isset($values[0]) && $values[0] != "") {
            if (isset($values[0]) && floatval($values[0])) {
                $borneInf = floatval($values[0]);
            }
            if (isset($values[1]) && floatval($values[1])) {
                $borneSup = floatval($values[1]);
            }
        } else {
            $val = intval($value);
            if (Str::startsWith($value, "-")) {
                $borneSup = abs($val);
            } else if (Str::startsWith($value, "+")) {
                $borneInf = $val;
            } else {
                $valeurExcate = $val;
            }
        }

        if (isset($valeurExcate)) {
            return $this->where(DB::raw('TIMESTAMPDIFF(YEAR, personnes.date_naissance, now())'), $valeurExcate)
                ->whereNotNull('personnes.date_naissance');
        }

        if (isset($borneInf) && isset($borneSup)) {
            return $this->whereBetween(DB::raw('TIMESTAMPDIFF(YEAR, personnes.date_naissance, now())'), [$borneInf, $borneSup])
                ->whereNotNull('personnes.date_naissance');
        }

        if (isset($borneInf)) {
            return $this->where(DB::raw('TIMESTAMPDIFF(YEAR, personnes.date_naissance, now())'), '>=', $borneInf)
                ->whereNotNull('personnes.date_naissance');
        }

        if (isset($borneSup)) {
            return $this->where(DB::raw('TIMESTAMPDIFF(YEAR, personnes.date_naissance, now())'), '<=', $borneSup)
                ->whereNotNull('personnes.date_naissance');
        }



        return $this->where('personnes.etat', $value);
    }

    public function genreId($value)
    {
        return $this->where('personnes.genre_id', $value);
    }

    public function typePersonne($value)
    {
        return $this->where('personnes.type', $value);
    }

    public function villeId($value)
    {
        return $this->where('personnes.ville_id', $value);
    }

    public function fonctionId($value)
    {
        return $this->where('personnes.fonction_id', $value);
    }


    public function codeFonction($value)
    {
        return $this->join('fonctions', function ($q) {
            $q->on('fonctions.id', 'personnes.fonction_id');
        })->where('fonctions.code', $value);
    }


    public function etatCotisation($value)
    {
        return $this->join('cotisations', function ($q) {
            $q->on('personnes.id', 'cotisations.personne_id');
        })->where('cotisations.etat', $value)
            ->where('cotisations.annee', date('Y'));
    }

    public function niveauFormationId($value)
    {
        return $this->where(DB::raw("JSON_CONTAINS(JSON_EXTRACT(personnes.formations, '$[*].niveau_formation_id') , '\"" . $value . "\"')"), '=', 1);
    }
}
