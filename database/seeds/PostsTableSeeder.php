<?php

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     */
    public function run()
    {
        $posts = factory(Post::class)->times(1000)->make();
        Post::insert($posts->toArray());
    }
}
