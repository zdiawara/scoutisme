<?php

namespace Database\Seeders;

use App\Models\TypeOrganisation;
use Illuminate\Database\Seeder;

class TypeOrganisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TypeOrganisation::create(['nom' => 'Unité', 'code' => 'unite']);
        TypeOrganisation::create(['nom' => 'Groupe', 'code' => 'groupe']);
    }
}
