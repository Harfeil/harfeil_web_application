<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
    {
        // Eager load library relationship for all books
        $books = Book::with('library')->get();

        // Map the books to include library name explicitly
        $booksWithLibraryName = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'isbn' => $book->isbn,
                'year_published' => $book->year_published,
                'category' => $book->category,
                'library_name' => $book->library?->library_name,
                'status' => $book->status? $book->status : 'available', // Default to 'available' if status is null
            ];
        });

        return response()->json($booksWithLibraryName);
    }

    /**
     * Show the form for creating a new resource.
     * (Not needed for API, usually for web apps, so can be empty)
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'required|string|max:255',
                'year_published' => 'required|integer',
                'isbn' => 'nullable|string',
                'genre' => 'nullable|string',
                'category' => 'nullable|string',
                'library_id' => 'required|exists:libraries,id',
                'status' => 'required|string',
            ], [
                'title.required' => 'The title field is required.',
                'author.required' => 'The author field is required.',
                'year_published.required' => 'The published year is required.',
                'library_id.required' => 'The library_id field is required.',
                'library_id.exists' => 'The selected library does not exist.',
                'status.required' => 'The status field is required.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Create book using only validated data
        $book = Book::create($validated);

        // Load library and staff info
        $book->load(['library.staff:id,name']);
        $response = [
            'id' => $book->id,
            'title' => $book->title,
            'author' => $book->author,
            'year_published' => $book->year_published,
            'isbn' => $book->isbn,
            'genre' => $book->genre,
            'category' => $book->category,
            'library' => $book->library ? $book->library->name : null,
            'staff_id' => $book->library && $book->library->staff ? $book->library->staff->id : null,
            'staff_name' => $book->library && $book->library->staff ? $book->library->staff->name : null,
        ];

        return response()->json($response, 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        return response()->json([
        'id' => $book->id,
        'title' => $book->title,
        'author' => $book->author,
        'isbn' => $book->isbn,
        'year_published' => $book->year_published,
        'category' => $book->category,
        'library_name' => $book->library?->library_name, // assuming the Library model has a 'name' column
        'status' => $book->status? $book->status : 'available', // Default to 'available' if status is null
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     * (Not needed for API)
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        // Validate input
        try {
            $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'author' => 'sometimes|required|string|max:255',
                'year_published' => 'sometimes|required|integer',
            ], [
                'title.required' => 'The title field is required.',
                'author.required' => 'The author field is required.',
                'year_published.required' => 'The published year is required.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Update book data
        if ($request->has('title')) {
            $book->title = $request->title;
        }
        if ($request->has('author')) {
            $book->author = $request->author;
        }
        if ($request->has('year_published')) {
            $book->year_published = $request->year_published;
        }
        if ($request->has('isbn')) {
            $book->isbn = $request->isbn;
        }
        if ($request->has('genre')) {
            $book->genre = $request->genre;
        }
        if ($request->has('category')) {
            $book->category = $request->category;
        }
        if ($request->has('status')) {
            $book->status = $request->status;
        }

        $book->save();

        return response()->json($book);
    }

    /**
     * Remove the specified resource from storage.
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

    public function getBooksByStaff($staffId)
    {
        // Get all books associated with the staff member
        $books = Book::whereHas('library.staff', function ($query) use ($staffId) {
            $query->where('id', $staffId);
        })->get();

        if ($books->isEmpty()) {
            return response()->json(['message' => 'No books found for this staff member'], 404);
        }

        // Map the books to include library name explicitly
        $booksWithLibraryName = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'isbn' => $book->isbn,
                'year_published' => $book->year_published,
                'category' => $book->category,
                'library_name' => $book->library?->library_name,
                'status' => $book->status,
            ];
        });

        return response()->json($booksWithLibraryName);
    }
}
