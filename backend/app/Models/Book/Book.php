<?php

namespace App\Models\Book;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book\BorrowedBook;
use Database\Factories\BookFactory;
class Book extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return BookFactory::new();
    }

    protected $fillable = [
        'title',
        'author',
        'isbn',
        'year_published',
        'category',
        'library_id',
        'status',
    ];


    public function borrowedBooks()
    {
        return $this->hasMany(BorrowedBook::class);
    }

    // Add relationship to Library
    public function library()
    {
        return $this->belongsTo(\App\Models\Library\Library::class);
    }
}
