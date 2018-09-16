function uname_focus(){
    $("#inuname").html("请输入6-12位的用户名称");
    $("#inuname").css({color:"green"});

}
//异步请求：检查用户名称是否存在
function checkUname() {
    //1.创建xhr
    var xhr = createXhr();
    //2.监听
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var res = xhr.responseText;
            $("#inuname").html(res);
            if (res == "用户名已存在" || res == "用户名称不能为空") {
                $("#inuname").css({color : "#f10215"});
            } else {
                $("#inuname").css({color : "green"});
            }
        }
    }
    //3.打开连接
    var uname = $("#uname").val();
    xhr.open("get", "/user/checkUname?uname=" + uname, true);
    //4.发送请求
    xhr.send(null);
}

function uname_blur(){
    if($("#uname").val()==""){
        $("#inuname").html("用户名称不能为空")
        $("#inuname").css({color:"#f10215"})
    }else if($("#uname").val().length>=6 && $("#uname").val().length<=12){
        $("#inuname").html("");
        checkUname();
        return true;
    }else{
        $("#inuname").html("用户名称格式不正确");
        $("#inuname").css({color:"#f10215"});
    }
    return false;
}
function checkupwd(){
    var upwd=$("#upwd").val();
    if(upwd==""){
        $("#inupwd").html("密码不能为空");
    }else{
        $("#inupwd").html("");
        return true;
    }
    return false;
}
//判断两次密码是否一致
function checkpwd(){
    var upwd=$("#upwd").val();
    var cpwd=$("#cpwd").val();
    if(cpwd==""){
        $("#incpwd").html("密码不能为空");
    }else if(upwd==cpwd){
        $("#incpwd").html("密码一致，通过");
        $("#incpwd").css({color:"green"});
        return true;
    }else{
        $("#incpwd").html("两次密码不一致");
        $("#incpwd").css({color:"#f10215"});
    }
    return false;
}

function checkemail(){
    var reg=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    console.log($("#email").val());
    if(!reg.test($("#email").val())){
        $("#inemail").html("请输入正确的邮箱地址");
        $("#inemail").css({color:"#f10215"});
    }else{
        $("#inemail").html("");
        return true;
    }
    return false;
}
//判断手机号
function checkphone(){
    if($("#phone").val().length!=11){
        $("#inphone").html("请输入合法的手机号");
        $("#inphone").css({color:"#f10215"});
    }else{
        $("#inphone").html("");
        return true;
    }
    return false;
}

function post_Msg(){
    var uname=$("#uname").val();
    var upwd=$("#upwd").val();
    var email=$("#email").val();
    var phone=$("#phone").val();
    uname_blur();
    checkupwd();
    checkpwd();
    checkemail();
    checkphone();
    if(uname_blur() && checkupwd() && checkpwd() && checkemail() && checkphone()){
    //1.创建异步对象
        var xhr=createXhr();
        //2.绑定监听事件
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var res=xhr.responseText;
                //console.log(res);
            }
        }
        //3.创建请求
        xhr.open("post","/user/add",true);
        //4.发送请求
        //增加：设置请求消息头
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        var formdata="uname="+uname+"&upwd="+upwd+"&email="+email+"&phone="+phone;

        xhr.send(formdata);
    }else {
    }
}
