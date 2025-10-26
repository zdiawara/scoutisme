<?php

use App\Helpers\Nature as HelpersNature;
use App\Models\Fonction;
use App\Models\Nature;
use App\Models\TypeOrganisation;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('fonctions', function (Blueprint $table) {
            $table->string('categorie')->default('direction'); // direction, scout, soutien
        });

        Fonction::create([
            'nom' => 'Soutien aux adultes',
            'code' => 'soutienAuxAdultes',
            'nature_id' => Nature::where('code', HelpersNature::NATIONAL)->first()->id,
            'type_id' => TypeOrganisation::where('code', 'equipe_nationale')->firstOrFail()->id,
            'categorie' => 'soutien'
        ]);

        DB::statement("UPDATE fonctions SET categorie = 'scout' WHERE code = 'scout'");
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
