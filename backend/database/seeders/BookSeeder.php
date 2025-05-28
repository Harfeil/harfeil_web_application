<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        Book::factory()->count(10)->create();
    }
}
