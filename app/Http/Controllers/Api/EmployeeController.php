<?php

namespace App\Http\Controllers\Api;

use App\Department;
use App\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller {
    
    public function list() {
        $employees = Employee::with('department')->get();
        return ['success' => 'ok', 'employees' => $employees];
    }

    public function create(Request $request) {
        $reqData = $request->all();
        
        $employee = new Employee();
        $employee->name = $reqData['name'];
        $employee->department_id = $reqData['department_id'];
        if($employee->save()) {
            return ['success' => 'ok', 'message' => 'Employee created successfully'];
        } else {
            return ['success' => 'fail', 'message' => 'Employee could not created!'];
        }
    }

    public function edit($id) {
        $employee = Employee::find($id);
        $departments = Department::where('is_deleted', 0)->get();
        if($employee) {
            return ['success' => 'ok', 'employee' => $employee, 'departments' => $departments];
        } else {
            return ['success' => 'fails', 'message' => 'Employee not find'];
        }
    }

    public function update(Request $request) {
        $reqData = $request->all();
        $employee = Employee::find($reqData['employee_id']);
        if($employee) {
            $employee->name = $reqData['name'];
            $employee->department_id = $reqData['department_id'];
            if($employee->save()) {
                return ['success' => 'ok', 'message' => 'Employee updated successfully'];
            } else {
                return ['success' => 'fail', 'message' => 'Employee could not be updated!'];
            }
        } else {
            return ['success' => 'fails', 'message' => 'Employee not find'];
        }
    }

    public function delete($id) {
        $employee = Employee::find($id);
        if($employee && $employee->delete()) {
            return ['success' => 'ok', 'message' => 'Employee deleted successfully'];          
        } else {
            return ['success' => 'fails', 'message' => 'Employee not found!'];
        }
    }
}
