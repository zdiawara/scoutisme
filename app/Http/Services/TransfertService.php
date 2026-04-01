<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Helpers\Nature;
use App\Mail\TransfertScoutMail;
use App\Models\Fonction;
use App\Models\Organisation;
use App\Models\Personne;
use App\Models\Transfert;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use sirajcse\UniqueIdGenerator\UniqueIdGenerator;

class TransfertService
{

    private AttributionService $attributinService;
    private array $config;

    public function __construct(AttributionService $attributinService)
    {
        $this->attributinService = $attributinService;
        $prefix = 'T' . date("ym");
        $this->config = [
            'table' => 'transferts',
            'field' => 'numero',
            'length' => 8,
            'prefix' => $prefix . '-',
            'reset_on_change' => 'prefix'
        ];
    }

    public function create(Personne $personne, array $input): Transfert
    {
        $body = collect($input);

        DB::beginTransaction();

        $codeUniteArrivee = strtoupper($body->get('codeUniteArrivee'));

        // transfert orga diff de unité
        $uniteArrivee = Organisation::whereHas('nature', function ($query) {
            $query->where('code', Nature::UNITE);
        })->whereRaw('UPPER(`code`) = ?', [$codeUniteArrivee])
            ->first();

        if (!isset($uniteArrivee)) {
            Log::warning('Création de transfert refusée: unité d\'arrivée introuvable', [
                'scout_id' => $personne->id,
                'code_unite_arrivee' => $codeUniteArrivee,
            ]);
            throw new BadRequestException("Unité d'arrivée n'existe pas");
        }

        if ($personne->type != "scout") {
            Log::warning('Création de transfert refusée: type de personne invalide', [
                'personne_id' => $personne->id,
                'type' => $personne->type,
            ]);
            throw new BadRequestException("Cette personne n'est pas un scout");
        }


        // même unité
        if (!isset($personne->organisation)) {
            Log::warning('Création de transfert refusée: scout sans unité', [
                'scout_id' => $personne->id,
            ]);
            throw new BadRequestException("Ce scout n'est pas dans une unité");
        }

        if ($personne->organisation->code == $codeUniteArrivee) {
            Log::warning('Création de transfert refusée: unité de départ identique à l\'arrivée', [
                'scout_id' => $personne->id,
                'code_unite' => $codeUniteArrivee,
            ]);
            throw new BadRequestException("Unité de depart et d'arrivée doivent être différentes");
        }

        $attributionResponsable = $this->attributinService->findResponsable($uniteArrivee->id);

        if (!isset($attributionResponsable)) {
            Log::warning('Création de transfert refusée: aucun responsable dans l\'unité d\'arrivée', [
                'unite_arrivee_id' => $uniteArrivee->id,
            ]);
            throw new BadRequestException("Aucun chef d'unité positionné sur " . $uniteArrivee->nom);
        }

        $userChefUnite = User::where('personne_id', $attributionResponsable->personne_id)
            ->first();

        if (!isset($userChefUnite)) {
            Log::warning('Création de transfert refusée: chef d\'unité sans compte', [
                'unite_arrivee_id' => $uniteArrivee->id,
            ]);
            throw new BadRequestException("Le chef d'unité de " . $uniteArrivee->nom . " ne possède pas de compte.");
        }

        $transfert = Transfert::create([
            'unite_depart_id' => $personne->organisation->id,
            'unite_arrivee_id' => $uniteArrivee->id,
            'scout_id' => $personne->id,
            'etat' => 'envoye',
            'numero' => UniqueIdGenerator::generate($this->config),
        ]);

        Mail::to($userChefUnite->email)->send(new TransfertScoutMail($transfert));

        DB::commit();

        Log::info('Transfert créé et notification envoyée', [
            'transfert_id' => $transfert->id,
            'numero' => $transfert->numero,
            'scout_id' => $transfert->scout_id,
        ]);

        return new Transfert();
    }

    public function confirmer(Transfert $transfert)
    {


        if ($transfert->etat == 'accepte') {
            Log::warning('Confirmation de transfert refusée: déjà accepté', [
                'transfert_id' => $transfert->id,
                'numero' => $transfert->numero,
            ]);
            throw new BadRequestException("Ce transfert est déjà accepté.");
        }

        DB::beginTransaction();

        $transfert->update([
            'etat' => 'accepte'
        ]);

        $this->attributinService->create([
            "personne_id" => $transfert->scout_id,
            "organisation_id" => $transfert->unite_arrivee_id,
            "fonction_id" => Fonction::where('code', "scout")->firstOrFail()->id,
            'date_debut' => now()
        ]);

        DB::commit();

        Log::info('Transfert confirmé', [
            'transfert_id' => $transfert->id,
            'numero' => $transfert->numero,
        ]);
    }
}
