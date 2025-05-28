<?php

namespace Database\Seeders;

use App\Models\Library\Library;
use App\Models\User\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $userIds = User::pluck('id');

        // Create 5 libraries
        foreach (range(1, 5) as $i) {
            Library::create([
                'library_name' => "Library $i",
                'assigned_staff' => $userIds->random(),
            ]);
        }
    }
}
