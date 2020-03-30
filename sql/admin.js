const mongoose = require('./db.js'); // .js可以省略 ---- 只需要导入 数据库连接的模块
const Schema = mongoose.Schema; // Schema 其实就是集合
// 确定集合的字段以及数据类型
const adminSchema = new Schema({
  adminname: { type: String },
  password: { type: String }
})

module.exports = mongoose.model('Admin', adminSchema); 