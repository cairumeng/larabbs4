<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => 'index']);
    }
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
        $post = $post->create([
            'title' => $request->title,
            'category_id' => $request->category,
            'user_id' => Auth::id(),
            'body' => $request->body
        ]);

        return response()->json([
            'success' => 'You have created a new post!',
            'post' => $post
        ]);
    }

    public function show(Post $post)
    {
        $post->user = $post->user()->first();
        $response['post'] = $post;
        $response['authUser'] = Auth::user();
        return view('posts.show',  $response);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);
        return view('posts.edit',  compact('post'));
    }

    public function update(Post $post, PostRequest $request)
    {
        $this->authorize('update', $post);
        $post->update($request->all());
        return response()->json([
            'success' => 'You have updated a new post!',
            'post' => $post
        ]);
    }

    public function destroy(Post $post)
    {
        $this->authorize('destroy', $post);
        $post->delete();
        return response()->json([
            'success' => 'You have deleted a new post!',
        ]);
    }
}
