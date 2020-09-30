<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Reply;
use Faker\Generator as Faker;

$factory->define(Reply::class, function (Faker $faker) {
    $updatedAt = $faker->dateTimeThisYear();
    return [
        'user_id' => $faker->numberBetween(1, 50),
        'post_id' => $faker->numberBetween(700, 1016),
        'content' => $faker->sentence(),
        'created_at' => $faker->dateTimeThisYear($updatedAt),
        'updated_at' => $updatedAt
    ];
});
