<?php

namespace App\Observers;

use App\Models\Reply;
use App\Notifications\PostReplied;

class ReplyObserver
{
    public function created(Reply $reply)
    {
        $post = $reply->post;
        $post->increment('reply_count', 1);
        $post->user->replyNotify(new PostReplied($reply));
    }
}
