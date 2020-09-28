<?php

namespace App\Http\Controllers;

use App\Handlers\ImageUploadHandler;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function uploadImage(Request $request, ImageUploadHandler $uploader)
    {
        $result = $uploader->save($request->file, 'posts', 'post', 416);

        if ($result) {
            return response()->json([
                'data' => [
                    'link' => $result['path'],
                ]
            ]);
        }
        return response()->json([
            'errors' => ['avatar' => 'fail to upload!']
        ], 422);
    }
}
