<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 users using the factory
        $users = User::factory()->count(5)->create();

        // Optional: Output to the console to confirm seeding
        $this->command->info("Seeded {$users->count()} users successfully.");
    }
}
