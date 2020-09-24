<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Post;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    $upated_at = $faker->dateTimeThisYear();
    $user_ids = User::orderBy('id')->limit(15)->pluck('id');
    $category_ids = [1, 2, 3, 4];
    return [
        'title' => $faker->sentence(),
        'body' => $faker->text(),
        'user_id' => $faker->randomElement($user_ids),
        'category_id' => $faker->randomElement($category_ids),
        'updated_at' => $upated_at,
        'created_at' => $faker->dateTimeThisYear($upated_at)
    ];
});
