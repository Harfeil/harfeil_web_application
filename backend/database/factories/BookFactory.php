<?php

namespace Database\Factories;

use App\Models\Book\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name(),
            'isbn' => $this->faker->isbn13(),
            'year_published' => $this->faker->year(),
            'genre' => $this->faker->randomElement(['Fiction', 'Non-fiction', 'Mystery', 'Fantasy', 'Biography']),
            'category' => $this->faker->randomElement(['Novel', 'Textbook', 'Magazine', 'Comic']),
            'library_id' => 1,
        ];
    }
}
