<?php

use App\Models\Fonctionnalite;
use App\Models\Module;
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

        Fonctionnalite::where(
            [
                'code' => 'creer',
                'module_id' => Module::where('code', 'unite')->first()->id
            ]
        )->delete();

        DB::unprepared('UPDATE fonctionnalites f
            INNER JOIN modules m ON f.module_id = m.id
            set
                f.description = "Ajouter une unité dans le système",
                f.nom = "Créer une unité"
            WHERE
                f.code = "creer"
                AND m.code = "groupe"');

        DB::unprepared('UPDATE fonctionnalites f
            INNER JOIN modules m ON f.module_id = m.id
            set
                f.description = "Ajouter un groupe ou une unité dans le système",
                f.nom = "Créer un groupe ou une unité"
            WHERE
                f.code = "creer"
                AND m.code = "region"');


        Schema::table('users', function (Blueprint $table) {
            $table->uuid('reset_password_hash')->nullable();
        });
    }
};
