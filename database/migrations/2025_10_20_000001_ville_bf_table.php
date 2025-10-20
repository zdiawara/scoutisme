<?php

use App\Models\Ville;
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
        DB::statement("ALTER TABLE villes ADD INDEX idx_nom (nom)");


        Schema::table('villes', function (Blueprint $table) {
            $table->string('type')->default('ville');
        });

        $villes = Ville::all()->groupBy(function ($ville) {
            return strtolower($this->removeAccents($ville->nom));
        });

        collect(json_decode(file_get_contents(storage_path() . "/Localite_bf.json"), true))
            ->each(function ($item) use ($villes) {
                $nom = strtolower($this->removeAccents($item['nom']));
                if (!$villes->has($nom)) {
                    Ville::create([
                        'nom' => $item['nom'],
                        'type' => strtolower($item['statut'])
                    ]);
                } else {
                    $ville = $villes->get($nom)->first();
                    $ville->update(['type' => strtolower($item['statut'])]);
                }
            });
    }

    function removeAccents($string)
    {
        $accents = [
            'à' => 'a',
            'â' => 'a',
            'ä' => 'a',
            'ç' => 'c',
            'é' => 'e',
            'è' => 'e',
            'ê' => 'e',
            'ë' => 'e',
            'î' => 'i',
            'ï' => 'i',
            'ô' => 'o',
            'ö' => 'o',
            'ù' => 'u',
            'û' => 'u',
            'ü' => 'u',
            'ÿ' => 'y',
            'À' => 'A',
            'Â' => 'A',
            'Ä' => 'A',
            'Ç' => 'C',
            'É' => 'E',
            'È' => 'E',
            'Ê' => 'E',
            'Ë' => 'E',
            'Î' => 'I',
            'Ï' => 'I',
            'Ô' => 'O',
            'Ö' => 'O',
            'Ù' => 'U',
            'Û' => 'U',
            'Ü' => 'U',
            'Ÿ' => 'Y'
        ];
        return strtr($string, $accents);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
