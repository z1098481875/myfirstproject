const express = require('express');
const pool = require('../pool.js');//导入连接数据库的模块
//使用路由器
var router = express.Router();
//添加请求方法为post，url为add的路由
//1.用户注册
router.post('/add',(req,res)=>{
  var obj=req.body;
  //对客户端所传递的数据进行验证
  var $uname = obj.uname;
  if(!$uname){ // $uname == ''
    res.send({code: 401, msg: 'uname required'});
	//禁止程序继续执行
	return;
  }
  //对密码验证，邮箱，手机进行验证
  var $upwd = obj.upwd;
  if(!$upwd){
    res.send({code: 402, msg: 'upwd required'});
	return;
  }
  var $email = obj.email
  if(!$email) {
    res.send({code: 403, msg: 'email required'});
	return;
  }
  var $phone = obj.phone;
  if(!$phone){
    res.send({code: 404, msg: 'phone required'});
	return;
  }
  var $date = new Date();
  console.log($date);
  //把数据插入到数据库中
  var sql = 'INSERT INTO user VALUES(NULL,?,?,?,?,?)';
  pool.query(sql,[$uname,$upwd,$email,$phone,$date],(err,result)=>{
    if(err) throw err;
	//提示注册成功
	res.send({code: 200, msg: 'register suc'});
  });
});
//get查询用户是否已经存在
router.get('/checkUname',(req,res)=>{
  var $uname=req.query.uname;
if(!$uname){
  res.send('用户名称不能为空');
  return;
}
var sql="select * from user where uname=?";
pool.query(sql,[$uname],(err,result)=>{
  if(err) throw err;
if(result.length>0){
  res.send('用户名已存在');
}else{
  res.send('用户名可用');
}
});
});
//2.用户登录
router.post('/login',(req,res)=>{
  var obj = req.body;
  //验证用户名和密码是否为空
  var $uname = obj.uname;
  if(!$uname){
    res.send({code: 401, msg: 'uname required'});
	return;
  }
  var $upwd = obj.upwd;
  if(!$upwd){
    res.send({code: 402, msg: 'upwd required'});
	return;
  }
  //查询数据库中是否含有这条记录
  //同时满足用户名为$uname和密码$upwd
  var sql='SELECT * FROM user WHERE uname=? AND upwd=?';
  pool.query(sql,[$uname,$upwd],(err,result)=>{
    if(err) throw err;
	//result 返回结果是数组
	//如果数组的长度大于0，说明找到满足条件的记录
	//否则数组的长度等于0，说明没有找到满足条件的记录
    if(result.length>0){
	  /*res.send({code: 200, msg: 'login suc'});*/
	  res.send({code: 200, msg: 'login suc'});
	}else{
      var sql2='SELECT * FROM user WHERE uname=?';
      pool.query(sql2,[$uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
          res.send({code: 301, msg: 'uname or upwd error'});
        }else{
          res.send({code: 302, msg: 'please register'});
        }
    })
	}
  });
});
//3.删除用户
router.get('/delete', (req,res)=>{
  var obj = req.query;
  var $uid = obj.uid;
  //验证是否为空
  if(!$uid){
    res.send({code: 401, msg: 'uid required'});
	return;
  }
  //根据所传递id来删除对应的数据
  var sql = 'DELETE FROM user WHERE uid=?';
  pool.query(sql,[$uid],(err,result)=>{
    if(err) throw err;
	//console.log(result.affectedRows);
	//判断是否删除成功
	if(result.affectedRows>0){
	  res.send({code:200, msg: 'delete suc'});
	}else{
	  res.send({code: 301, msg: 'delete error'});
	}
  });
});
//4.用户检索
router.get('/query', (req,res)=>{
  var uid = req.query.uid;
  if(!uid){
    res.send({code: 401, msg: 'uid required'});
	return;
  }
  //执行查询
  //防止sql注入
  var sql = `SELECT * FROM user WHERE uid=?`;
  pool.query(sql,[uid],(err,result)=>{
    //console.log(result);
	if(result.length>0){
	  //把这个数据发送给客户端
	  res.send(result[0]);
	}else{
	  res.send({code: 301, msg: 'can not find'});
	}
  });
});
//5.用户修改
router.post('/update', (req,res)=>{
  //获取传递数据
  var obj = req.body;
  var $uid = obj.uid;
  if(!$uid){
	res.send({code: 401, msg: 'uid required'});
	return;
  }
  var $user_name = obj.user_name;
  if(!$user_name) {
    res.send({code: 402, msg: 'user_name requried'});
	return;
  }
  var $gender = obj.gender;
  if(!$gender){
    res.send({code: 403, msg: 'gender required'});
	return;
  }
  var $email = obj.email;
  if(!$email) {
    res.send({code: 404, msg: 'email required'});
	return;
  }
  var $phone = obj.phone;
  if(!$phone) {
    res.send({code: 405, msg: 'phone required'});
	return;
  }
  //构建sql语句 --10:29
  var sql = 'UPDATE user SET user_name=?,gender=?,email=?,phone=? WHERE uid=?';
  pool.query(sql, [$user_name, $gender, $email, $phone, $uid], (err,result)=>{
    if(err) throw err;
	//console.log(result);
	//判断affectedRows，如果值大于0，有更新
	if(result.affectedRows>0){
	  res.send({code: 200, msg: 'update suc'});
	}else{
	  res.send({code: 301, msg: 'update error'});
	}
  });
});
//6.用户列表
router.get('/list', (req,res)=>{
  var obj = req.query;
  //console.log(obj);
  var $page = obj.page; //页码
  var $size = obj.size; //每页大小
  //把客户端所传递的数据转为整型
  $page = parseInt($page);
  $size = parseInt($size);
  //如果为空，设置一个默认值
  if(!$page){
    $page = 1; //页码为空，默认第一页
  }
  if(!$size){
    $size = 2; //分页大小为空，默认大小为2
  }
  //计算分页查询的开始
  var $begin = ($page-1)*$size;
  var sql = 'SELECT * FROM user LIMIT ?,?';
  pool.query(sql,[$begin,$size],(err,result)=>{
    //console.log(result);
	if(err) throw err;
	res.send(result);
  });
});




//导出路由器
module.exports = router;
