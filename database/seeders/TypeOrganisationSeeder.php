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
        TypeOrganisation::create(['nom' => 'Meute', 'code' => 'meute']);
        TypeOrganisation::create(['nom' => 'Troupe', 'code' => 'troupe']);
        TypeOrganisation::create(['nom' => 'Communauté', 'code' => 'communaute']);
        TypeOrganisation::create(['nom' => 'Dièklou', 'code' => 'dieklou']);
    }
}
