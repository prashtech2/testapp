@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                   <form method="post" action="" id="loginForm">
                        <label>Email</label>
                        <input type="text" name="email" id ="email">
                        <label>Password</label>
                        <input type="password" name="password" id ="password">
                        <input type="submit" value="Login">
                   </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
