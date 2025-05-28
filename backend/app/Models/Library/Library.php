<?php

namespace App\Models\Library;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Library extends Model
{
    use HasFactory;

    protected $fillable = [
        'library_name',
        'assigned_staff' // This will be a user_id foreign key
    ];

    // A library has many books
    public function books()
    {
        return $this->hasMany(\App\Models\Book\Book::class);
    }

    // Relationship: assigned staff (user)
    public function staff()
    {
        return $this->belongsTo(\App\Models\User\User::class, 'assigned_staff');
    }
}
