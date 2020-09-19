<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function creating(User $user)
    {
        $user->avatar = env('APP_URL') . '/images/avatars/default_avatar.png';
    }
}
