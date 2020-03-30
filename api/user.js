var express = require('express');
var router = express.Router();
var sql = require('./../sql');
var User = require('./../sql/user');

/* GET users listing. */
/**
 * 获取所有的用户信息的接口
 */
router.get('/', function(req, res, next) {
  sql.find(User, {}, { _id: 0 }).then(data => {
    res.send(data)
  })
});
// jsonp 
// router.get('/', function(req, res, next) {
//   let _callback = req.query.callback;
//   sql.find(User, {}, { _id: 0 }).then(data => {
//     // res.send(data)
//     if (_callback) {
//       // 这两步设置发送也是NODE.JS发送JSONP必备 
//       res.type('text/javascript'); 
//       res.send(_callback + '(' + JSON.stringify(data) + ')');
//     } else {
//       res.send(data)
//     }
//   })
// });

/**
 * 以手机号获取某一个人的信息
 * /api/user/detail?tel=*****
 */
router.get('/detail', function(req, res, next) {
  const obj = req.query;
  sql.find(User, obj, { _id: 0 }).then(data => {
    res.send(data)
  })
});
/**
 * 查询 年龄在某一区间内部
 * /api/user/range?min=18&max=25
 */
router.get('/range', function(req, res, next) {
  const { min, max } = req.query;
  sql.find(User, { age: { $lte: max, $gte: min }}, { _id: 0 }).then(data => {
    res.send(data)
  })
});
/**
 * 分页
 * /api/user/pagging?limitNum=5&pageCode=1
 */
router.get('/pagging', (req, res, next) => {
  let { limitNum, pageCode } = req.query;
  limitNum *= 1;
  pageCode *= 1;
  sql.pagging(User, {}, { _id:0, username: 1 }, limitNum, pageCode).then(data => {
    res.send(data)
  })
})

module.exports = router;
