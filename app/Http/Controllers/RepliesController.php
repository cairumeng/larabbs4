<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use Illuminate\Http\Request;

class RepliesController extends Controller
{
    public function store(Reply $reply, Request $request)
    {
        $request->validate([
            'content' => ['required', 'max:255'],
        ]);
        $reply->create($request->all());
        return response()->json([
            'success' => 'You have published a reply to this post!'
        ]);
    }

    public function destroy(Reply $reply)
    {
        $reply->delete();
        return response()->json([
            'success' => 'You have delete the reply.'
        ]);
    }
}
