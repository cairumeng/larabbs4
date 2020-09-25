<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

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
}
