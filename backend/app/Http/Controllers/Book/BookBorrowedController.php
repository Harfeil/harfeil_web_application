<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book\BorrowedBook;
use App\Models\Book\Book;
use App\Models\User\User;
use Illuminate\Support\Facades\Validator;

class BookBorrowedController extends Controller
{
    // List all borrowed books
    public function index()
    {
        $borrowed = BorrowedBook::all();
        return response()->json($borrowed);
    }

    // Store a new borrowed book record
    public function store(Request $request)
    {
        // Accept both string and timestamp for dates, and provide clear validation messages
        $validator = Validator::make($request->all(), [
            'book_id' => ['required', 'integer', 'exists:books,id'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'borrowed_at' => ['required', 'date'],
            'due_at' => ['required', 'date', 'after:borrowed_at'],
            'returned_at' => ['nullable', 'date', 'after:borrowed_at'],
        ], [
            'book_id.required' => 'The book_id field is required.',
            'book_id.exists' => 'The selected book does not exist.',
            'user_id.required' => 'The user_id field is required.',
            'user_id.exists' => 'The selected user does not exist.',
            'borrowed_at.required' => 'The borrowed_at field is required.',
            'borrowed_at.date' => 'The borrowed_at must be a valid date.',
            'due_at.required' => 'The due_at field is required.',
            'due_at.date' => 'The due_at must be a valid date.',
            'due_at.after' => 'The due_at must be after borrowed_at.',
            'returned_at.date' => 'The returned_at must be a valid date.',
            'returned_at.after' => 'The returned_at must be after borrowed_at.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $borrowed = BorrowedBook::create($validator->validated());
        return response()->json($borrowed, 201);
    }

    // Show a specific borrowed book record
    public function show($id)
    {
        $borrowed = BorrowedBook::find($id);
        if (!$borrowed) {
            return response()->json(['message' => 'Borrowed record not found'], 404);
        }
        return response()->json($borrowed);
    }

    // Update a borrowed book record
    public function update(Request $request, $id)
    {
        $borrowed = BorrowedBook::find($id);
        if (!$borrowed) {
            return response()->json(['message' => 'Borrowed record not found'], 404);
        }
        $validated = $request->validate([
            'book_id' => 'sometimes|required|exists:books,id',
            'user_id' => 'sometimes|required|exists:users,id',
            'borrowed_at' => 'sometimes|required|date',
            'due_at' => 'sometimes|required|date|after:borrowed_at',
            'returned_at' => 'nullable|date|after:borrowed_at',
        ]);
        $borrowed->update($validated);
        return response()->json($borrowed);
    }

    // Delete a borrowed book record
    public function destroy($id)
    {
        $borrowed = BorrowedBook::find($id);
        if (!$borrowed) {
            return response()->json(['message' => 'Borrowed record not found'], 404);
        }
        $borrowed->delete();
        return response()->json(['message' => 'Borrowed record deleted successfully']);
    }

    // Get all borrowed books for a specific user
    public function userBorrowedBooks($userId)
    {
        $borrowed = BorrowedBook::where('user_id', $userId)->get();
        return response()->json($borrowed);
    }

    // Get all users who borrowed a specific book
    public function bookBorrowedUsers($bookId)
    {
        $borrowed = BorrowedBook::where('book_id', $bookId)->with('user')->get();
        $users = $borrowed->map(function($record) {
            return $record->user;
        })->unique('id')->values();
        return response()->json($users);
    }
}
