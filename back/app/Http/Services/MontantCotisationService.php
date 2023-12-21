<?php

namespace App\Http\Services;

use App\Models\MontantCotisation;
use App\Models\Personne;

class MontantCotisationService
{
    public function findMontant(string $personneId)
    {
        $personne = Personne::findOrFail($personneId);
        $organisation = $personne->organisation;
        $fonction = $personne->fonction;
        $codeNature = $organisation->nature->code;

        $typeMontantCotisation = "";

        if ($codeNature === "unite" && $personne->type === "scout") {
            $typeMontantCotisation = "scout";
        } else if ($codeNature === "unite" && $personne->type === "adulte") {
            $typeMontantCotisation = "direction_unite";
        } else if ($codeNature === "groupe") {
            $typeMontantCotisation = "direction_groupe";
        } else if ($codeNature === "region") {
            $typeMontantCotisation = "direction_region";
        } else if ($codeNature === "national" && $organisation->type->code === "equipe_nationale") {
            $typeMontantCotisation = "direction_equipe_nationale";
        } else if ($codeNature === "national" && $organisation->type->code === "conseil_national") {
            $typeMontantCotisation = "direction_conseil_national";
        }

        $montantCotisation = MontantCotisation::where("type", $typeMontantCotisation)->get()
            ->firstOrFail();

        if ($montantCotisation->profil === "fonction") {
            return collect($montantCotisation->montants)->filter(function ($montant) use ($fonction) {
                dd($montant);
                return $montant['id'] === $fonction->id;
            })->firstOrFail()['value'];
        }

        if ($montantCotisation->profil === "type_organisation") {
            return collect($montantCotisation->montants)->filter(function ($montant) use ($organisation) {
                return $montant['id'] === $organisation->type->id;
            })->firstOrFail()['value'];
        }

        return collect($montantCotisation->montants)->firstOrFail()['value'];
    }
}
