$( "#loginForm" ).submit(function( event ) {
  
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    $.ajax({
        method: "POST",
        url: "api/login",
        data: {"email":email, "password":password}
    })
    .done(function( res ) {
        if(res.token != 'null' && res.token != 'undefined' && res.token != null) {
            localStorage.setItem("Token", res.token);
            console.log(localStorage.getItem("Token"));
            window.location.href = window.location.origin+"/testapp/dashboard";
        } else {
            
        }
    });
});


$( "#viewDept" ).click(function() {
    $("#view-dept").removeClass("hide").addClass("show");
    $("#view-emp").removeClass("show").addClass("hide");
    $(".form").removeClass("show").addClass("hide");
    $("#deptTable tbody").empty();
    var token = localStorage.getItem("Token");

    $.ajax({
        method: "GET",
        url: "api/department/list",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+token);            
        },
        success: function(res){
            if(res.success == "ok") {
                if(res.departments.length > 0) {
                    $.each( res.departments, function( key, value ) {
                        var editDBtn = '<input type="button" value="Edit" onclick="editDept('+value.id+')">';
                        var delDBtn = '<input type="button" value="Delete" onclick="delDept('+value.id+')">';
                        $('#deptTable').append('<tr><td>'+(key+1)+'</td><td>'+value.name+'</td><td>'+editDBtn+delDBtn+'</td></tr>');
                    });
                }
            } else {
               
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401)
                window.location.href = window.location.origin+"/testapp";
        }
    });
});

function delDept(id) {
   var token = localStorage.getItem("Token");
    var result = confirm("Confirm to delete?");
    if (result) {
        $.ajax({
            method: "GET",
            url: "api/department/delete/"+id,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer "+token);
            },
            success: function(res){
                if(res.success == "ok") {
                    $( "#viewDept" ).trigger( "click" );
                    $(".message").html(res.message);
                    $(".message").removeClass("hide").addClass("show success");
                    setTimeout(messageDisappear, 3000);
                } else {
                    $(".message").html(res.message);
                    $(".message").removeClass("hide").addClass("show danger");
                    setTimeout(messageDisappear, 3000);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status == 401)
                    window.location.href = window.location.origin+"/testapp";
            }
        });
    }
}

function editDept(id) {
    $('.tab').removeClass('show').addClass('hide');
    $('#deptForm').removeClass('hide').addClass('show');
    var token = localStorage.getItem("Token");
    $.ajax({
        method: "GET",
        url: "api/department/edit/"+id,
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+token);
        },
        success: function(res){
            if(res.success == "ok") {
                $("#dname").val(res.department.name);
                $("#deptId").val(res.department.id);
                

            } else {
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401)
                window.location.href = window.location.origin+"/testapp";
        }
    });
}

$( "#deptSave" ).click(function() {
    var token = localStorage.getItem("Token");
    var url = "api/department/update";
    if($('#deptId').val() == ""){
        url = "api/department/create";
    }
    $.ajax({
        method: "POST",
        url: url,
        data: {"name":$('#dname').val(), "id":$('#deptId').val()},
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+token);
        },
        success: function(res){
            if(res.success == "ok") {
                $('#deptForm').removeClass('show').addClass('hide');
                $( "#viewDept" ).trigger( "click" );
                $(".message").html(res.message);
                $(".message").removeClass("hide").addClass("show success");
                setTimeout(messageDisappear, 3000);
            } else {
                $(".message").html(res.message);
                $(".message").removeClass("hide").addClass("show danger");
                setTimeout(messageDisappear, 3000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401)
                window.location.href = window.location.origin+"/testapp";
        }
    });
});

$( "#viewEmp" ).click(function() {
    $("#view-emp").removeClass("hide").addClass("show");
    $("#view-dept").removeClass("show").addClass("hide");
    $(".form").removeClass("show").addClass("hide");
    $("#empTable tbody").empty();
    var token = localStorage.getItem("Token");
    $.ajax({
        method: "GET",
        url: "api/employee/list",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+token);
        },
        success: function(res){
            if(res.success == "ok") {
                if(res.employees.length > 0) {
                    $.each( res.employees, function( key, value ) {
                        var editDBtn = '<input type="button" value="Edit" onclick="editEmp('+value.id+')">';
                        var delDBtn = '<input type="button" value="Delete" onclick="delEmp('+value.id+')">';
                        $('#empTable').append('<tr><td>'+(key+1)+'</td><td>'+value.name+'</td><td>'+value.department.name+'</td><td>'+editDBtn+delDBtn+'</td></tr>');
                    });
                }
            } else {
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401)
                window.location.href = window.location.origin+"/testapp";
        }
    });
});

function editEmp(id) {
    $('.tab').removeClass('show').addClass('hide');
    $('#empForm').removeClass('hide').addClass('show');
    var token = localStorage.getItem("Token");
    $.ajax({
        method: "GET",
        url: "api/employee/edit/"+id,
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+token);
        },
        success: function(res){
            if(res.success == "ok") {
                $("#ename").val(res.employee.name);
                $("#empId").val(res.employee.id);

                if(res.departments.length > 0) {
                    $('#deptOption').empty();
                    $.each( res.departments, function( key, value ) {
                        if(res.employee.department_id == value.id){
                            var option = '<option value="'+value.id+'" selected="selected">'+value.name+'</option>';
                        } else {
                            var option = '<option value="'+value.id+'">'+value.name+'</option>';
                        }
                        $('#deptOption').append(option);
                    });
                }
            } else {
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401)
                window.location.href = window.location.origin+"/testapp";
        }
    });
}

$( "#empSave" ).click(function() {
    var token = localStorage.getItem("Token");
    var url = "api/employee/update";
    var deptId = $("#deptOption option:selected").val();
    if($('#empId').val() == ""){
        url = "api/employee/create";
        deptId = $("#deptOption option:selected").val();
    }
    if(deptId == "" || deptId == "undefined" || deptId == undefined){
        alert("Please select department");
        return false;
    }
    $.ajax({
        method: "POST",
        url: url,
        data: {"name":$('#ename').val(), "employee_id":$('#empId').val(), "department_id": deptId},
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+token);
        },
        success: function(res){
            if(res.success == "ok") {
                $('#deptForm').removeClass('show').addClass('hide');
                $( "#viewEmp" ).trigger( "click" );
                $(".message").html(res.message);
                $(".message").removeClass("hide").addClass("show success");
                setTimeout(messageDisappear, 3000);
            } else {
                $(".message").html(res.message);
                $(".message").removeClass("hide").addClass("show danger");
                setTimeout(messageDisappear, 3000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401)
                window.location.href = window.location.origin+"/testapp";
        }
    });
});

function delEmp(id) {
   var token = localStorage.getItem("Token");
    var result = confirm("Confirm to delete?");
    if (result) {
        $.ajax({
            method: "GET",
            url: "api/employee/delete/"+id,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer "+token);
            },
            success: function(res){
                if(res.success == "ok") {
                    $( "#viewEmp" ).trigger( "click" );
                    $(".message").html(res.message);
                    $(".message").removeClass("hide").addClass("show success");
                    setTimeout(messageDisappear, 3000);
                } else {
                    $(".message").html(res.message);
                    $(".message").removeClass("hide").addClass("show danger");
                    setTimeout(messageDisappear, 3000);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status == 401)
                    window.location.href = window.location.origin+"/testapp";
            }
        });
    }
}

$( "#addEmp" ).click(function() {
    $('#ename ,#empId').val("");
    $('.tab').removeClass('show').addClass('hide');
    $('#empForm').removeClass('hide').addClass('show');
    $('#deptForm').removeClass('show').addClass('hide');
    var token = localStorage.getItem("Token");
    $.ajax({
        method: "GET",
        url: "api/department/list",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+token);
        },
        success: function(res){
            if(res.success == "ok") {
                if(res.departments.length > 0) {
                    console.log(res.departments);
                    $('#deptOption').empty();
                    $.each( res.departments, function( key, value ) {
                        var option = '<option value="'+value.id+'">'+value.name+'</option>';
                        $('#deptOption').append(option);
                    });
                }
            } else {
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401)
                window.location.href = window.location.origin+"/testapp";
        }
    });
});

$( "#addDept" ).click(function() {
    $('#deptId, #dname').val("");
    $('.tab').removeClass('show').addClass('hide');
    $('#deptForm').removeClass('hide').addClass('show');
    var token = localStorage.getItem("Token");
});

function messageDisappear() {
    $(".message").html("");
    $(".message").removeClass("show success").addClass("hide");
}