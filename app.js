var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var productRouter = require('./routes/product');
var apiUserRouter = require('./api/user');

var app = express();

/** 自定义中间件 */
var allowCrossDomain = function (req, res, next) {
  // 所有的接口都可以访问
  res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
  next();
}
app.use(allowCrossDomain); // 使中间件生效 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ 
  secret : "nihao", //加密session，随便写 
  cookie : {maxAge : 60*1000*30}, //设置过期时间 --- 半小时 
  resave : true, //强制保存session 默认为 true，建议设置成false 
  saveUninitialized : false ////强制将未初始化的session存储 默认为true，建议设置成true 
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/api/user', apiUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
