<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name' => 'required|between:3,25|regex:/^[A-Za-z0-9\-\_]+$/',
            'email' => 'required|email',
            'description' => 'max:80',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Username coud not be empty!',
            'name.between' => 'Username should between three to 25 characters.',
            'name.regex' => 'Username should be letter,number,hyphen,underscore',
            'email.email' => 'Your email format is not correct',
            'description.max' => 'Your description could not be larger than 80'
        ];
    }
}
