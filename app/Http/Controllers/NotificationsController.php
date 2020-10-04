<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        $notifications = Auth::user()->notifications()->paginate(10);
        $notifications->markAsRead();
        $reponse['notifications'] = $notifications;

        return view('notifications.index', $reponse);
    }
}
