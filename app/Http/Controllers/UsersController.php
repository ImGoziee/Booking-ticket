<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Models\User;

class UsersController extends Controller
{
    public function index()
    {
        $data = User::orderBy('created_at', 'asc')->get();
        return Inertia::render('Admin/Users/UsersPage', ['users' => $data]);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
            ]);
    
            User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);
    
            return back()->with('success', 'Data added successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    public function update(Request $request, User $user)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => "required|email|unique:users,email,{$user->id}",
            ]);
    
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);
    
            return back()->with('success', 'Data updated successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    public function destroy(User $user)
    {
        try {
            if ($user->id === auth()->id()) {
                return redirect()->back()->with('error', 'You cannot delete your own account');
            }

            $user->delete();
            return redirect()->back()->with('success', 'Data deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete data');
        }
    }
}
