<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\TypeOrganisation;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $unite = TypeOrganisation::where('code', 'unite')
            ->firstOrFail();

        Role::create(['nom' => "Chef d'unité", 'code' => 'chef_unite', 'type_organisation_id' => $unite->id]);
        Role::create(['nom' => "Adjoint au chef d'unité", 'code' => 'adj_chef_unite', 'type_organisation_id' => $unite->id]);
        Role::create(['nom' => "Chargé de la trésorerie", 'code' => 'charge_tresorie', 'type_organisation_id' => $unite->id]);
        Role::create(['nom' => "Chargé de l'information", 'code' => 'charge_info', 'type_organisation_id' => $unite->id]);
        Role::create(['nom' => "Secrétaire", 'code' => 'secretaire', 'type_organisation_id' => $unite->id]);
    }
}
