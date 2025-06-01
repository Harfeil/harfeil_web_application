<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book\Book;

class BookController extends Controller
{
    /**
     * Display a listing of all books with their library info.
     */
    public function index()
    {
        // Eager load library relation for all books
        $books = Book::with('library')->get();

        $booksWithLibrary = $books->map(function ($book) {
            return [
                'id'             => $book->id,
                'title'          => $book->title,
                'author'         => $book->author,
                'isbn'           => $book->isbn,
                'year_published' => $book->year_published,
                'category'       => $book->category,
                'library_name'   => $book->library?->library_name,
                'status'         => $book->status ?? 'available',
            ];
        });

        return response()->json($booksWithLibrary);
    }
    public function store(Request $request)
    {
        // Validate input
        try {
            $validated = $request->validate([
                'title'          => 'required|string|max:255',
                'author'         => 'required|string|max:255',
                'year_published' => 'required|integer',
                'isbn'           => 'nullable|string',
                'genre'          => 'nullable|string',
                'category'       => 'nullable|string',
                'library_id'     => 'required|exists:libraries,id',
                'status'         => 'nullable|string',
            ], [
                'title.required'          => 'The title field is required.',
                'author.required'         => 'The author field is required.',
                'year_published.required' => 'The published year is required.',
                'library_id.required'     => 'The library_id field is required.',
                'library_id.exists'       => 'The selected library does not exist.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Create book
        $book = Book::create($validated);

        // Load related library and staff data
        $book->load(['library.staff:id,name']);

        return response()->json([
            'id'             => $book->id,
            'title'          => $book->title,
            'author'         => $book->author,
            'year_published' => $book->year_published,
            'isbn'           => $book->isbn,
            'genre'          => $book->genre,
            'category'       => $book->category,
            'status'         => $book->status ?? 'available',
            'library_name'   => $book->library?->library_name,
            'staff_id'       => $book->library?->staff?->id,
            'staff_name'     => $book->library?->staff?->name,
        ], 201);
    }

    /**
     * Display a specific book.
     */
    public function show(string $id)
    {
        $book = Book::with('library')->find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        return response()->json([
            'id'             => $book->id,
            'title'          => $book->title,
            'author'         => $book->author,
            'isbn'           => $book->isbn,
            'year_published' => $book->year_published,
            'category'       => $book->category,
            'library_name'   => $book->library?->library_name,
            'status'         => $book->status ?? 'available',
        ]);
    }
    public function update(Request $request, string $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        // Validate input for partial updates
        try {
            $request->validate([
                'title'          => 'sometimes|required|string|max:255',
                'author'         => 'sometimes|required|string|max:255',
                'year_published' => 'sometimes|required|integer',
                'isbn'           => 'sometimes|nullable|string',
                'genre'          => 'sometimes|nullable|string',
                'category'       => 'sometimes|nullable|string',
                'status'         => 'sometimes|nullable|string',
            ], [
                'title.required'          => 'The title field is required.',
                'author.required'         => 'The author field is required.',
                'year_published.required' => 'The published year is required.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Update fields if present
        foreach (['title', 'author', 'year_published', 'isbn', 'genre', 'category', 'status'] as $field) {
            if ($request->has($field)) {
                $book->$field = $request->input($field);
            }
        }

        $book->save();

        return response()->json($book);
    }

    /**
     * Delete a book.
     */
    public function destroy(string $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }

    /**
     * Get books associated with a specific staff member.
     */
    public function getBooksByStaff($staffId)
    {
        $books = Book::whereHas('library.staff', function ($query) use ($staffId) {
            $query->where('id', $staffId);
        })->with('library')->get();

        if ($books->isEmpty()) {
            return response()->json(['message' => 'No books found for this staff member'], 404);
        }

        $booksWithLibrary = $books->map(function ($book) {
            return [
                'id'             => $book->id,
                'title'          => $book->title,
                'author'         => $book->author,
                'isbn'           => $book->isbn,
                'year_published' => $book->year_published,
                'category'       => $book->category,
                'library_name'   => $book->library?->library_name,
                'status'         => $book->status ?? 'available',
            ];
        });

        return response()->json($booksWithLibrary);
    }
}
