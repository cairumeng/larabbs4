<?php

namespace App\Http\Controllers;

use App\Handlers\ImageUploadHandler;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    public function index(Request $request)
    {
        $response = [];
        $query = Post::with('user', 'category');

        // Order
        if ($request->orderBy == 'latest') {
            $query->latest();
        } else {
            $query->orderBy('updated_at', 'DESC');
        }

        // Category
        if ($request->categoryId > 0) {
            $query->where('category_id', $request->categoryId);
            $response['category'] = Category::find($request->categoryId);
        }

        //User
        if ($request->userId > 0) {
            $query->where('user_id', $request->userId);
        }

        $posts = $query->paginate(20);
        $response['posts'] = $posts;

        return view('posts.index', $response);
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(PostRequest $request, Post $post)
    {
        $post->create([
            'title' => $request->title,
            'category_id' => $request->category,
            'user_id' => Auth::id(),
            'body' => $request->body
        ]);
        return response()->json([
            'success' => 'You have created a new post!'
        ]);
    }
}
