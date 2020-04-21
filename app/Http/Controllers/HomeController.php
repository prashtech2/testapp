<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application login page.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function login() {
        return view('/home/login');
    }

    public function dashboard() {
        return view('/home/dashboard');
    }

}
