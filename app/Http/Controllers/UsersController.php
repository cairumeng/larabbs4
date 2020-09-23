<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;

class UsersController extends Controller
{
    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(User $user, UserRequest $request)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'description' => $request->description
        ]);

        return response()->json([
            'success' => 'You have updated your profile!'
        ]);
    }
}
