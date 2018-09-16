function uname_focus(){
    $("#inuname").html("请输入您的用户名");
    $("#inuname").css({color:"green"});
}
function uname_blur() {
    if ($("#uname").val() == "") {
        $("#inuname").html("用户名称不能为空");
        $("#inuname").css({color : "#f10215"});
    }else if($("#uname").val().length<6 || $("#uname").val().length>12){
        $("#inuname").html("用户名称错误");
        $("#inuname").css({color : "#f10215"});
    }else if($("#uname").val().length>=6 && $("#uname").val().length<=12){
        $("#inuname").html("");
    }
}
function upwd_focus(){
    $("#inupwd").html("请输入您的密码");
    $("#inupwd").css({color:"green"});
}
function upwd_blur() {
    if ($("#uname").val() == "") {
        $("#inupwd").html("密码不能为空");
        $("#inupwd").css({color : "#f10215"});
    }else if($("#upwd").val() != ""){
        $("#inupwd").html("");
    }
}
function deng_Lu(){
    /*if($("uname").value!=""&&$("upwd").value!=""){
     $("login-botton").disabled="false";
     console.log("1udkjkl");
     }else{
     $("login-botton").disabled="true";
     }*/
    var uname=$("#uname").val();
    var upwd=$("#upwd").val();
    if(uname===""&&upwd===""){
        $("#inuname").html("用户名称不能为空");
        $("#inuname").css({color : "#f10215"});
        $("#inupwd").html("密码不能为空");
        $("#inupwd").css({color : "#f10215"});
    }else if(uname===""){
        $("#inuname").html("用户名称不能为空");
        $("#inuname").css({color : "#f10215"});
    }else if(upwd===""){
        $("#inupwd").html("密码不能为空");
        $("#inupwd").css({color : "#f10215"});
    }else{
        //1.创建异步对象
        var xhr=createXhr();
        //2.绑定监听事件
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var res=xhr.responseText;
                //console.log(res);
                var data=JSON.parse(res);
                console.log(data);
                if(data.code==200){
                    window.location.href="/index.html";
                    console.log(window)
                }else if(data.code==301){
                    //alert("uname or upwd error");
                    $(`<div class="modal fade" id="myModal1" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">提示</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                    <p>${data.msg}</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                    </div>
                    </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                    </div>`).appendTo("body");
                    $('#myModal1').modal('show')
                }else if(data.code==302){
//                          window.location.href="/user_register.html";
                    $('#myModal').modal('show')
                }
            }
        }
        //3.创建请求
        xhr.open("post","/user/login",true);
        //4.发送请求
        //增加：设置请求消息头
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        var formdata="uname="+uname+"&upwd="+upwd;
        xhr.send(formdata);
    }
}
function sure(){
    window.location.href="/user_register.html";
}