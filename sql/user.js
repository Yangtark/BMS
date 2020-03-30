const mongoose = require('./db.js'); // .js可以省略 ---- 只需要导入 数据库连接的模块
const Schema = mongoose.Schema; // Schema 其实就是集合
// 确定集合的字段以及数据类型
const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  age: { type: Number },
  tel: { type: String },
  sex: { type: String },
  lesson: { type: String },
  city: { type: String }
})

// 将此集合暴露出去，供业务逻辑使用 --- 增删改查
module.exports = mongoose.model('User', userSchema); // 执行到此处，数据库中会出现users集合