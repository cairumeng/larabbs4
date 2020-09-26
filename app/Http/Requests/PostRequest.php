<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|between:3,50',
            'body' => 'required|between:3,255'
        ];
    }

    // public function messages()
    // {
    //     return[
    //         'title.required'=>'Title is required!',
    //         'title.between'=>' Title should be between three to 25 characters',
    //         'body.required'=>'Body is required!',
    //         'body.between'=>'Bodyshould be between three to 25 characters'
    //     ];
    // }
}
