<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book\BorrowedBook;
use App\Models\Book\Book;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BookBorrowedController extends Controller
{
    public function index()
    {
        $borrowedBooks = BorrowedBook::with('book.library')->get();

        $result = $borrowedBooks->map(fn($borrow) => $this->formatBorrowedBook($borrow));

        return response()->json($result);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|integer|exists:books,id',
            'user_id' => 'required|integer|exists:users,id',
            'borrowed_at' => 'required|date',
            'due_at' => 'required|date|after:borrowed_at',
            'returned_at' => 'nullable|date|after:borrowed_at',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            $data = $validator->validated();
            $data['status'] = 'borrowed';

            $borrowedBook = BorrowedBook::create($data);

            $book = Book::find($data['book_id']);
            if ($book) {
                $book->status = 'borrowed';
                $book->save();
            }

            DB::commit();

            return response()->json($this->formatBorrowedBook($borrowedBook), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to borrow book',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(int $id)
    {
        $borrowedBook = BorrowedBook::with('book.library')->find($id);

        if (!$borrowedBook) {
            return response()->json(['message' => 'Borrowed record not found'], 404);
        }

        return response()->json($this->formatBorrowedBook($borrowedBook));
    }

    public function update(Request $request, int $id)
    {
        $borrowedBook = BorrowedBook::find($id);

        if (!$borrowedBook) {
            return response()->json(['message' => 'Borrowed record not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'book_id' => 'sometimes|required|integer|exists:books,id',
            'user_id' => 'sometimes|required|integer|exists:users,id',
            'borrowed_at' => 'sometimes|required|date',
            'due_at' => 'sometimes|required|date|after:borrowed_at',
            'returned_at' => 'nullable|date|after:borrowed_at',
            'status' => 'sometimes|required|string|in:borrowed,returned',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $borrowedBook->update($validator->validated());

        return response()->json($this->formatBorrowedBook($borrowedBook));
    }

    public function handleReturn(Request $request, int $id)
    {
        $borrowedBook = BorrowedBook::find($id);

        if (!$borrowedBook) {
            return response()->json(['message' => 'Borrowed record not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'returned_at' => 'required|date|after_or_equal:borrowed_at',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            $borrowedBook->returned_at = $request->returned_at;
            $borrowedBook->status = 'returned';
            $borrowedBook->save();

            $book = Book::find($borrowedBook->book_id);
            if ($book) {
                $book->status = 'available';
                $book->save();
            }

            DB::commit();

            return response()->json([
                'message' => 'Book marked as returned',
                'data' => $this->formatBorrowedBook($borrowedBook),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to mark book as returned',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(int $id)
    {
        $borrowedBook = BorrowedBook::find($id);

        if (!$borrowedBook) {
            return response()->json(['message' => 'Borrowed record not found'], 404);
        }

        $borrowedBook->delete();

        return response()->json(['message' => 'Borrowed record deleted successfully']);
    }

    public function userBorrowedBooks(int $userId)
    {
        $borrowedBooks = BorrowedBook::with('book.library')
            ->where('user_id', $userId)
            ->get();

        $result = $borrowedBooks->map(fn($borrow) => $this->formatBorrowedBook($borrow));

        return response()->json($result);
    }

    public function bookBorrowedUsers(int $bookId)
    {
        $borrowedBooks = BorrowedBook::with('user')
            ->where('book_id', $bookId)
            ->get();

        // Unique users who borrowed the book
        $users = $borrowedBooks->pluck('user')->unique('id')->values();

        return response()->json($users);
    }

    public function getBorrowedBooksByStaff(int $staffId)
    {
        $borrowedBooks = BorrowedBook::whereHas('book.library', function ($query) use ($staffId) {
            $query->where('assigned_staff', $staffId);
        })
        ->with(['book.library'])
        ->get();

        $result = $borrowedBooks->map(fn($borrow) => $this->formatBorrowedBook($borrow));

        return response()->json($result);
    }

    private function formatBorrowedBook(BorrowedBook $borrow): array
    {
        $book = $borrow->book;

        return [
            'borrow_id' => $borrow->id,
            'user_id' => $borrow->user_id,
            'borrowed_at' => $borrow->borrowed_at,
            'due_at' => $borrow->due_at,
            'returned_at' => $borrow->returned_at,
            'borrow_status' => $borrow->status,
            'book_id' => $book?->id,
            'title' => $book?->title,
            'author' => $book?->author,
            'isbn' => $book?->isbn,
            'year_published' => $book?->year_published,
            'category' => $book?->category,
            'library_name' => $book?->library?->library_name ?? 'Library not found',
            'status' => $book?->status ?? 'unknown',
        ];
    }
}
