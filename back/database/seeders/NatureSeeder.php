<?php

namespace Database\Seeders;

use App\Models\Nature;
use Illuminate\Database\Seeder;

class NatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Nature::create(['nom' => 'Unité', 'code' => 'unite']);
        Nature::create(['nom' => 'Groupe', 'code' => 'groupe']);
        Nature::create(['nom' => 'Région', 'code' => 'region']);
        Nature::create(['nom' => 'National', 'code' => 'national']);
    }
}
