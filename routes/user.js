var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx');
var nodeExcel = require('excel-export');
// var sql = require('./../sql/index');
var sql = require('./../sql');
var User = require('./../sql/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  sql.find(User, {}, { _id: 0 }).then(data => {
    res.render('user', { 
      aindex: 2,
      data: data
    });
  })
});

router.get('/add', function(req, res, next) {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  res.render('userAdd', { aindex: 2 });
});
/**
 * 前端 提交 添加用户的表单
 * POST 请求
 */
router.post('/addAction', function(req, res, next) {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  /**
   * 获取到的所有的数据均是string类型，需要根据实际情况修改数据类型
   * get  req.query
   * post req.body
   */
  let data = req.body;
  data.age *= 1; // age是number类型
  sql.insert(User, data).then(() => {
    // res.send(data)
    // 插入成功之后需要返回用户列表页面  --- 重定向
    res.redirect('/user')
  })
  
});

// /user/delete?tel=18813007814
router.get('/delete', (req, res, next) => {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  let data = req.query; // { tel: 18813007814 }
  sql.delete(User, data).then(() => {
    //  删除成功之后需要返回用户列表页面  --- 重定向
    res.redirect('/user')
  })
})

// /user/update?tel=18813007814
router.get('/update', (req, res, next) => {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  /**
   * 依据手机号拿到本人信息，并且渲染至更新页面
   * 更新页面渲染数据
   */
  let whereObj = req.query;
  sql.find(User, whereObj, { _id:0 }).then(data => {
    res.render('userUpdate', { 
      aindex: 2,
      // data: data
      data
    })
  })
})

router.post('/updateAction', function(req, res, next) {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  /**
   * 获取到的所有的数据均是string类型，需要根据实际情况修改数据类型
   * get  req.query
   * post req.body
   */
  let data = req.body;
  data.age *= 1; // age是number类型
  let updateObj = {
    $set: data
  }
  sql.update(User, { tel: data.tel }, updateObj).then(() => {
    // res.send(data)
    // 插入成功之后需要返回用户列表页面  --- 重定向
    res.redirect('/user')
  })
  
});

var xlsxfile = 'E:/course-wxx/sh1906/week1/day03/myapp/1902.xlsx'
router.get('/upload', (req, res, next) => {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  // 1。读取表格信息
  const obj = xlsx.parse(xlsxfile);
  // res.send(obj) // [{name: '', data: []},{}]
  // res.send(obj[0]) // {name: '', data: []}
  // res.send(obj[0].data) // [[表头], [数据]]
  let data = obj[0].data;
  // 第一个元素是表头，不需要 --- 过滤
  data.splice(0, 1);
  // res.send(data) // [["张玉印",1,18,13275585217,217,1,"安徽"],[],[]]
  // ["张玉印",1,18,13275585217,217,1,"安徽"]
  let arr = []
  data.map(item => {
    let userobj = {
      username: item[0],
      password: item[4] + '',
      age: item[2],
      tel: item[3] + '',
      sex: item[1] + '',
      lesson: item[5] + '',
      city: item[6]
    }
    arr.push(userobj)
  })
  sql.insert(User, arr).then(() => {
    res.redirect('/user');
  })
})

router.get('/download', (req, res, next) => {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  sql.find(User, {}, { _id: 0 }).then(data => {
    // 先拿到所有的数据
    // [{"username":"张玉印","password":"217","age":18,"tel":"13275585217","sex":"1","lesson":"1","city":"安徽","__v":0},{}]
    // res.send(data)

    let conf = {}; // 设计导出的表
    conf.name = "mysheet";//表格名 ---  不要写中文
    let alldata = new Array(); // 用来存放excel中的数据
    data.map(item => {
      let arr = [];
      arr.push(item.username);
      arr.push(item.password);
      arr.push(item.age);
      arr.push(item.tel);
      arr.push(item.sex);
      arr.push(item.lesson);
      arr.push(item.city);
      alldata.push(arr);
    })
    // res.send(alldata)
    // 设定列名以及类型
    //决定列名和类型
    conf.cols = [{
        caption:'用户名',
        type:'string'
    },{
        caption:'密码',
        type:'string'
    },{
        caption:'年龄',
        type:'number'
    },{
        caption:'手机号码',
        type:'string'
    },{
      caption:'性别',
      type:'string'
    },{
      caption:'课程',
      type:'string'
    },{
      caption:'城市',
      type:'string'
    }];

    conf.rows = alldata;
    // 这几句话不需要理解，直接使用
    let result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "userinfo.xlsx");
    res.end(result, 'binary');
  })
})
module.exports = router;
