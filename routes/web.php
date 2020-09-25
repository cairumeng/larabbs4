<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::resource('users', 'UsersController')->only(['show', 'edit', 'update']);
Route::post('users/{user}/upload_avatar', 'UsersController@uploadAvatar');
Route::resource('posts', 'PostsController')->only(['index', 'show', 'edit', 'update']);

Route::resource('categories', 'CategoriesController')->only(['show']);
