<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name', 'description', 'post_count'
    ];

    public function posts()
    {
        $this->hasMany(Post::class);
    }
}
