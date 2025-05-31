<?php

namespace App\Models\Book;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book\Book;
use App\Models\User\User;

class BorrowedBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'user_id',
        'borrowed_at',
        'due_at',
        'returned_at',
        'status'
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
