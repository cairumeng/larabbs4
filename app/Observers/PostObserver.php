<?php

namespace App\Observers;

use App\Models\Post;
use Mews\Purifier\Facades\Purifier;

class PostObserver
{
    public function saving(Post $post)
    {
        $post->body = Purifier::clean($post->body);
    }
}
