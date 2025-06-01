<?php

namespace Tests\Unit;

use App\Models\Book\Book;
use App\Models\Library\Library;
use App\Models\Book\BorrowedBook;
use PHPUnit\Framework\TestCase;

class BookTest extends TestCase
{
    /** @test */
    public function it_has_fillable_attributes()
    {
        $book = new Book();

        $expected = [
            'title',
            'author',
            'isbn',
            'year_published',
            'category',
            'library_id',
            'status',
        ];

        $this->assertEquals($expected, $book->getFillable());
    }
}
