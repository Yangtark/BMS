const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/sh1906';

mongoose.connect(DB_URL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => { console.log('数据库连接成功') })
mongoose.connection.on('disconnected', () => { console.log('数据库连接失败') })
mongoose.connection.on('err', () => { console.log('数据库连接异常') })

module.exports = mongoose; // 自定义模块
