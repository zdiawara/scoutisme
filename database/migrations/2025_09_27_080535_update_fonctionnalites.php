<?php

use App\Models\Fonctionnalite;
use App\Models\Module;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('UPDATE fonctionnalites f
            INNER JOIN modules m ON f.module_id = m.id
            set
                f.description = "Créer une unité dans le système"
            WHERE
                f.code = "creer"
                AND m.code = "unite"');

        DB::unprepared('UPDATE fonctionnalites f
            INNER JOIN modules m ON f.module_id = m.id
            set
                f.description = "Créer un groupe dans le système"
            WHERE
                f.code = "creer"
                AND m.code = "groupe"');

        DB::unprepared('UPDATE fonctionnalites f
            INNER JOIN modules m ON f.module_id = m.id
            set
                f.description = "Créer une région dans le système"
            WHERE
                f.code = "creer"
                AND m.code = "region"');

        Fonctionnalite::create(
            [
                'nom' => 'Modifier',
                'code' => 'modifier',
                'description' => 'Modifier une unité dans le système',
                'module_id' => Module::where('code', 'unite')->first()->id
            ]
        );

        Fonctionnalite::create(
            [
                'nom' => 'Modifier',
                'code' => 'modifier',
                'description' => 'Modifier un groupe dans le système',
                'module_id' => Module::where('code', 'groupe')->first()->id
            ]
        );

        Fonctionnalite::create(
            [
                'nom' => 'Modifier',
                'code' => 'modifier',
                'description' => 'Modifier une région dans le système',
                'module_id' => Module::where('code', 'region')->first()->id
            ]
        );
    }
};
