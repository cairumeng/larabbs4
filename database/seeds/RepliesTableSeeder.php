<?php

use App\Models\Reply;
use Illuminate\Database\Seeder;

class RepliesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $replies = factory(Reply::class)->times(2000)->make();
        Reply::insert($replies->toArray());
    }
}
