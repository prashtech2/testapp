<?php

namespace App\Http\Controllers\Api;

use App\Department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DepartmentController extends Controller {
    
    public function list() {
        $departments = Department::where('is_deleted', 0)->get();
        return ['success' => 'ok', 'departments' => $departments];
    }

    public function create(Request $request) {
        $reqData = $request->all();
        
        $department = new Department();
        $department->name = $reqData['name'];
        if($department->save()) {
            return ['success' => 'ok', 'message' => 'Department created successfully'];
        } else {
            return ['success' => 'fail', 'message' => 'Department could not created!'];
        }
    }

    public function edit($id) {
        $department = Department::find($id);
        if($department) {
            return ['success' => 'ok', 'department' => $department];
        } else {
            return ['success' => 'fails', 'message' => 'Department not find'];
        }
    }

    public function update(Request $request) {
        $reqData = $request->all();
        $department = Department::find($reqData['id']);
        if($department) {
            $department->name = $reqData['name'];
            if($department->save()) {
                return ['success' => 'ok', 'message' => 'Department updated successfully'];
            } else {
                return ['success' => 'fail', 'message' => 'Department could not be updated!'];
            }
        } else {
            return ['success' => 'fails', 'message' => 'Department not find'];
        }
    }

    public function delete($id) {
        $department = Department::find($id);
        if($department) {
            $department->is_deleted = 1;
            if($department->save()){
                return ['success' => 'ok', 'message' => 'Department deleted successfully'];
            } else {
                return ['success' => 'fail', 'message' => 'Department could not be deleted!'];
            }
        } else {
            return ['success' => 'fails', 'message' => 'Department not find'];
        }
    }
}
