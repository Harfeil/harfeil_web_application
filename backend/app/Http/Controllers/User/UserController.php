<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return only safe fields to avoid serialization issues
        $users = \App\Models\User\User::select('id', 'name', 'email', 'role')->get();
        return response()->json($users);
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
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'role' => 'required|string',
                'password' => 'required|string|min:6',
            ], [
                'email.unique' => 'The email address is already taken.',
                'email.required' => 'The email field is required.',
                'name.required' => 'The name field is required.',
                'password.required' => 'The password field is required.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => bcrypt($request->password),
        ]);

        return response()->json($user, 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
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
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validate input (email unique except for this user)
        try {
            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => "sometimes|required|email|unique:users,email,$id",
                'password' => 'nullable|string|min:6',
                'role' => 'nullable|string',
            ], [
                'email.unique' => 'The email address is already taken.',
                'email.required' => 'The email field is required.',
                'name.required' => 'The name field is required.',
                'password.required' => 'The password field is required.',
                'role.required' => 'The role field is required.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Update user data
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        if ($request->filled('role')) {
            $user->role = $request->role;
        }

        $user->save();

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function getStaffUsers()
    {
        // Fetch all users with the 'staff' role
        $staffs = User::where('role', 'staff')->select('id', 'name', 'email')->get();
        
        if ($staffs->isEmpty()) {
            return response()->json(['message' => 'No staff found'], 404);
        }

        return response()->json($staffs);
    }
    public function getBorrowerUsers()
    {
        $studentsAndTeachers = User::whereIn('role', ['student', 'teacher'])
            ->select('id', 'name', 'email', 'role')
            ->get();

        if ($studentsAndTeachers->isEmpty()) {
            return response()->json(['message' => 'No borrowers found'], 404);
        }

        return response()->json($studentsAndTeachers);
    }
}
