<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Library\Library;
use App\Models\Book\Book;
use App\Models\User\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LibraryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_fillable_attributes()
    {
        $library = new Library();

        $this->assertEquals([
            'library_name',
            'assigned_staff',
        ], $library->getFillable());
    }

}
