<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Handlers\ImageUploadHandler;


class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => 'show']);
    }
    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    public function edit(User $user)
    {
        $this->authorize('update', $user);
        return view('users.edit', compact('user'));
    }

    public function update(User $user, UserRequest $request)
    {
        $this->authorize('update', $user);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'description' => $request->description
        ]);

        return response()->json([
            'success' => 'You have updated your profile!'
        ]);
    }

    public function uploadAvatar(User $user, Request $request, ImageUploadHandler $uploader)
    {
        $this->authorize('update', $user);
        $result = $uploader->save($request->file, 'avatars', $user->id, 416);

        if ($result) {
            return response()->json([
                'path' => $result['path']
            ]);
        }
        return response()->json([
            'errors' => ['avatar' => 'fail to upload!']
        ], 422);
    }
}
