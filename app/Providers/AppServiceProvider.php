<?php

namespace App\Providers;

use App\Models\Post;
use App\Models\User;
use App\Models\Reply;
use App\Observers\PostObserver;
use App\Observers\UserObserver;
use App\Observers\ReplyObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Reply::observe(ReplyObserver::class);
        User::observe(UserObserver::class);
        Post::observe(PostObserver::class);
    }
}
