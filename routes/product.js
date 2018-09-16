const express = require('express');
//使用express路由器功能
var router = express.Router();
//使用到数据库连接
const pool = require('../pool.js');
//路由
//1.商品列表
router.get('/list', (req,res)=>{
  //获取客户端传递页码和每页大小
  var obj = req.query;
  //console.log(obj);
  //把传递页码和大小转为整型
  var $page = parseInt(obj.page);
  var $size = parseInt(obj.size);
  //如果页码或者大小为空，设置默认值
  if(!$page){
    $page = 1;
  }
  if(!$size){
    $size = 5;
  }
  //计算开始查询的值
  var $begin = ($page-1)*$size;
  //
  var sql = 'SELECT * FROM xz_laptop LIMIT ?,?';
  pool.query(sql,[$begin,$size],(err,result)=>{
    if(err) throw err;
	//console.log(result);
	res.send(result);
  });
});
// 接收post  var obj = req.body
// 继续往obj添加属性 obj.lid = null
// insert into xz_laptop set ?
//2.商品添加
router.post('/add', (req,res)=>{
  var obj = req.body; //缺少 lid属性
  //遍历对象
  var i = 400;
  for(var key in obj){
	  i++;
     //key 属性名 --- obj[key]
	 //console.log(key + '---' + obj[key]);
    if(!obj[key]){
	  //向客户端发送对象
	  res.send({code: i, msg: key+' required'});
	  return;
	}
  }
  obj.lid = null;
  //console.log(obj);
  var sql = 'INSERT INTO xz_laptop SET ?';
  pool.query(sql,[obj],(err,result)=>{
    if(err) throw err;
	console.log(result);
  });
  /*
  var family_id = obj.family_id;
  var title = obj.title;
  var subtitle = obj.subtitle;
  var price = obj.price;
  var promise = obj.promise;
  var spec = obj.spec;
  var lname = obj.lname;
  var os = obj.os;
  var memory = obj.memory;
  var resolution = obj.resolution;
  var video_card = obj.video_card;
  var cpu = obj.cpu;
  var video_memory = obj.video_memory;
  var category = obj.category;
  var disk = obj.disk;
  var details = obj.details;
  var shelf_time = obj.shelf_time;
  var sold_count = obj.sold_count;
  var is_onsale = obj.is_onsale;
  //sql语句
  var sql = 'INSERT INTO xz_laptop VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  pool.query(sql,[family_id,title,subtitle,price,promise,spec,lname,os,memory,resolution,video_card,cpu,video_memory,category,disk,details,shelf_time,sold_count,is_onsale],(err,result)=>{
    if(err) throw err;
	if(result.affectedRows>0){
	  res.send({code: 200, msg: 'add suc'});
	}
  });
  */
});
//3.商品删除
router.get('/delete', (req,res)=>{
  //获取客户端传递商品编号
  var $lid = req.query.lid;
  //验证商品编号为空
  if(!$lid) {
    res.send({code: 401, msg: 'lid required'});
	return;
  }
  //删除商品
  var sql = 'DELETE FROM xz_laptop WHERE lid=?';
  pool.query(sql,[$lid],(err,result)=>{
    if(err) throw err;
	//console.log(result);
	if(result.affectedRows>0){
	  res.send({code: 200, msg: 'delete suc'});
	}else{
	  res.send({code: 301, msg: 'delete err'});
	}
  });
});
//4.商品检索
router.get('/query',(req,res)=>{

});
//5.商品修改




//导出路由器
module.exports = router;