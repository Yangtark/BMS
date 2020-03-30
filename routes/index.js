var express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();
var sql = require('./../sql');
var Admin = require('./../sql/admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return; // 不再执行下面的代码
  // }
  if (req.session.isLogin !== 'ok') {
    res.redirect('/login');
    return; // 不再执行下面的代码
  }
  res.render('index', { aindex: 1 });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/loginAction', function(req, res, next) {
  let { adminname, password } = req.body;
  sql.find(Admin, { adminname: adminname }, { _id: 0}).then((data) => {
    console.log(data)
    if (data.length === 0 ){
      // 该管理员不存在
      res.redirect('/login')
    } else if (data.length > 0) {
      let pwd = data[0].password;
      if (bcrypt.compareSync(password, pwd)) {
        // 设置登陆的标识
        // res.cookie('isLogin', 'ok'); // cookie
        req.session.isLogin = 'ok' // session
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/')
    }
  })
});

router.get('/logout', (req, res, next) => {
  // res.cookie('isLogin', 1);
  // req.session.isLogin = 1;
  req.session.destroy();
  res.redirect('/login')
})
module.exports = router;
