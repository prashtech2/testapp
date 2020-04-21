<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->group( function () {
	Route::get('/department/list', 'Api\DepartmentController@list')->name('department.list');
	Route::get('/department/edit/{id}', 'Api\DepartmentController@edit')->name('department.edit');
	Route::get('/department/delete/{id}', 'Api\DepartmentController@delete')->name('department.delete');
	Route::post('/department/create', 'Api\DepartmentController@create')->name('department.create');
	Route::post('/department/update', 'Api\DepartmentController@update')->name('department.update');

	Route::get('/employee/list', 'Api\EmployeeController@list')->name('employee.list');
	Route::get('/employee/edit/{id}', 'Api\EmployeeController@edit')->name('employee.edit');
	Route::get('/employee/delete/{id}', 'Api\EmployeeController@delete')->name('employee.delete');
	Route::post('/employee/create', 'Api\EmployeeController@create')->name('employee.create');
	Route::post('/employee/update', 'Api\EmployeeController@update')->name('employee.update');
});

// public routes
Route::post('/login', 'Api\AuthController@login')->name('login.api');
Route::post('/register', 'Api\AuthController@register')->name('register.api');
Route::get('/login/required', 'Api\AuthController@loginRequired')->name('login.required');