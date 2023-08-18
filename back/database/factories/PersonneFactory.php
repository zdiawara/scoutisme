<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Scout>
 */
class PersonneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'id' => Str::uuid(),
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'etat' => 1,
            'code' => fake()->unique()->numerify('#####'),
            'email' => fake()->unique()->safeEmail(),
            //'telephones' => ,
            'date_naissance' => now(),
            'lieu_naissance' => 'Bobo Dioulasso',
        ];
    }
}
