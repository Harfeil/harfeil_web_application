<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Library\Library;

class LibraryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return only the name and assigned staff (user name) for each library
        $libraries = Library::with('staff:id,name')->get();
        $result = $libraries->map(function ($library) {
            return [
                'id' => $library->id,
                'library_name' => $library->library_name,
                'assigned_staff' => $library->staff ? $library->staff->name : null,
            ];
        });
        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'library_name' => 'required|string|max:255',
            'assigned_staff' => 'required|exists:users,id',
        ]);

        $library = Library::create($validated);
        $library->load('staff:id,name');
        return response()->json([
            'id' => $library->id,
            'library_name' => $library->library_name,
            'assigned_staff' => $library->staff ? $library->staff->name : null,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $library = Library::with('staff:id,name')->find($id);
        if (!$library) {
            return response()->json(['message' => 'Library not found'], 404);
        }

        return response()->json([
            'id' => $library->id,
            'library_name' => $library->library_name,
            'assigned_staff' => $library->staff ? $library->staff->name : null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $library = Library::find($id);
        if (!$library) {
            return response()->json(['message' => 'Library not found'], 404);
        }

        $validated = $request->validate([
            'library_name' => 'sometimes|required|string|max:255',
            'assigned_staff' => 'sometimes|required|exists:users,id',
        ]);

        $library->update($validated);
        $library->load('staff:id,name');
        return response()->json([
            'id' => $library->id,
            'library_name' => $library->library_name,
            'assigned_staff' => $library->staff ? $library->staff->name : null,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $library = Library::find($id);
        if (!$library) {
            return response()->json(['message' => 'Library not found'], 404);
        }

        $library->delete();
        return response()->json(['message' => 'Library deleted successfully']);
    }

    /**
     * Get the library assigned to a specific staff (user).
     */
    public function getLibraryByStaff($userId)
    {
        $library = Library::with('staff:id,name')
            ->where('assigned_staff', $userId)
            ->first();

        if (!$library) {
            return response()->json(['message' => 'No library assigned to this staff'], 404);
        }

        return response()->json([
            'id' => $library->id,
            'library_name' => $library->library_name,
            'assigned_staff' => $library->staff ? $library->staff->name : null,
        ]);
    }

}
