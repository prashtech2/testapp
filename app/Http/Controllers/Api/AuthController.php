<?php

namespace App\Http\Controllers\Api;

use Hash;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
    
    public function register (Request $request) {
        // die('here');
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $user = User::create($request->toArray());

        if($user){
            $response = ['success' => 'ok', 'message' => 'User created successfully'];
        } else {
            $response = ['success' => 'fail', 'message' => 'could not create user!'];
        }

        return response($response, 200);

    }

    public function login (Request $request) {

        $user = User::where('email', $request->email)->first();

        if ($user) {

            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $response = ['token' => $token];
                return response($response, 200)->cookie('Token', 'Bearer ' . $token, 60);
            } else {
                $response = "Password missmatch";
                return response($response, 422);
            }

        } else {
            $response = 'User does not exist';
            return response($response, 422);
        }
    }

    public function loginRequired() {
        $response = ['success' => 'fail', 'message' => "Login required!"];
        return response($response, 422);
    }
}
