@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard
                    <span class="message hide"></span>
                    <div>
                        <button id="viewDept">View Department</button>
                        <button id="addDept">Add Department</button>
                        <button id="viewEmp">View Employees</button>
                        <button id="addEmp">Add Employee</button>
                    </div>
                </div>

                <div class="card-body">
                   <div id="view-dept" class="hide tab">
                        <table border="1" id="deptTable">
                            <thead>
                                <th>S. No</th>
                                <th>Department Name</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                <tr></tr>
                            </tbody>
                        </table>
                   </div>
                   <div id="deptForm" class="hide form">
                        <label>Department Name</label>
                        <input type="text" value="" id="dname">
                        <input type="hidden" value="" id="deptId">
                        <input type="button" value="Save" id="deptSave">
                   </div>

                   <div id="view-emp" class="hide tab">
                        <table border="1" id="empTable">
                            <thead>
                                <th>S. No</th>
                                <th>Employee Name</th>
                                <th>Department Name</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                <tr></tr>
                            </tbody>
                        </table>
                   </div>
                   <div id="empForm" class="hide form">
                        <label>Employee Name</label>
                        <input type="text" value="" id="ename">
                        <input type="hidden" value="" id="empId">
                        <label>Department</label>
                        <select id="deptOption">

                        </select>
                        <input type="button" value="Save" id="empSave">
                   </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
