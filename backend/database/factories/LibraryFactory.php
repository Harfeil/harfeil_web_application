<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User\User;

class LibraryFactory extends Factory
{
    protected $model = \App\Models\Library\Library::class;

    public function definition()
    {
        return [
            'library_name' => $this->faker->company,
            'assigned_staff' => User::factory(),  // or assign a static user ID for now
        ];
    }
}
