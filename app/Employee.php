<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model {
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'department_id'
    ];

    
    public function department() {
        return $this->belongsTo('App\Department');
    }
}
