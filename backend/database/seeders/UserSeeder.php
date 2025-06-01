<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create an admin user
        $admin = User::create([
            'name' => 'Harfeil Salmeron',
            'email' => 'harfeil@gmail.com',
            'role' => 'admin',
            'password' => Hash::make('123456')
        ]);

        // Create 5 regular users using the factory
        $users = User::factory()->count(5)->create();

        // Output to the console
        $this->command->info("Seeded 1 admin user: {$admin->email}");
        $this->command->info("Seeded {$users->count()} regular users successfully.");
    }
}
