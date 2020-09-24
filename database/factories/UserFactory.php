<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\User;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    $updated_at = $faker->dateTimeThisDecade();
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => null,
        'password' => bcrypt(12345678), // password
        'remember_token' => null,
        'description' => $faker->sentence(),
        'updated_at' => $updated_at,
        'created_at' => $faker->dateTimeThisDecade($updated_at),
    ];
});
