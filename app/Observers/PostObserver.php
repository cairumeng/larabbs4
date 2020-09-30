<?php

namespace App\Observers;

use App\Models\Post;
use Mews\Purifier\Facades\Purifier;

class PostObserver
{
    public function saving(Post $post)
    {
        dd(5555);
        $post->body = Purifier::clean($post->body);
    }
}
