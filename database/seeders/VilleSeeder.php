<?php

namespace Database\Seeders;

use App\Models\Ville;
use Illuminate\Database\Seeder;

class VilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ville::create(['nom' => "Ouagadougu", 'code' => "ouaga"]);
        Ville::create(['nom' => "Bobo Dioulasso", 'code' => "bobo"]);
        Ville::create(['nom' => "Koudougou", 'code' => "koudougou"]);
    }
}
