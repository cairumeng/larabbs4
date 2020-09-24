<?php

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'name' => 'Share',
                'description' => 'Share creations, share discoveries!'
            ],
            [
                'name' => 'Course',
                'description' => 'Development technics and packages!'
            ],
            [
                'name' => 'Q&A',
                'description' => 'Keep polite, help each other!'
            ],
            [
                'name' => 'Annoucement',
                'description' => 'Site annoucements!'
            ]
        ];
        Category::insert($categories);
    }
}
