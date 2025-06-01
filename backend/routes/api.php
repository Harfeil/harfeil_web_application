<?php

use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Book\BookController;
use App\Http\Controllers\Book\BookBorrowedController;
use App\Http\Controllers\Library\LibraryController;
use App\Http\Controllers\User\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('login');

// Routes that require authentication
Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('borrowed-books/staff/{staffId}', [BookBorrowedController::class, 'getBorrowedBooksByStaff']);
    Route::get('books/staff-books/{staffId}', [BookController::class, 'getBooksByStaff']);
    Route::get('users/borrowers', [UserController::class, 'getBorrowerUsers']);
    Route::post('users/{id}', [UserController::class, 'update']);
    Route::get('users/staff', [UserController::class, 'getStaffUsers']);
    Route::get('borrowed-books/user/{userId}', [BookBorrowedController::class, 'userBorrowedBooks']);

    Route::apiResource('users', UserController::class);
    Route::apiResource('books', BookController::class);
    Route::apiResource('library', LibraryController::class);
    Route::apiResource('borrowed-books', BookBorrowedController::class);
    Route::get('library/staff/{userId}', [LibraryController::class, 'getLibraryByStaff']);
});

// Public test route
Route::get('/test', function() {
    return response()->json(['message' => 'API works!']);
});
