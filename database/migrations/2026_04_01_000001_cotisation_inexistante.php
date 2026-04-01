<?php

use App\Http\Services\CotisationService;
use App\Http\Services\MontantCotisationService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{

    /**
     * Run the migrations.
     */
    public function up(): void
    {

        $cotisationService = new CotisationService(new MontantCotisationService());

        collect(DB::select("SELECT p.id FROM personnes p
                WHERE p.organisation_id IS NOT NULL
                    AND NOT EXISTS (
                        SELECT 1
                        FROM cotisations c
                        WHERE c.personne_id = p.id AND c.annee = 2026
                    )", []))
            ->each(function ($item) use ($cotisationService) {
                $cotisationService->create($item->id, '2026');
            });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
