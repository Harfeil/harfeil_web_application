<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // You can directly create users here if you want
        // User::factory(10)->create();

        // Call individual seeders
        $this->call([
            UserSeeder::class,
            LibrarySeeder::class,
            BookSeeder::class,
            // Add more seeders here as needed
        ]);
    }
}
