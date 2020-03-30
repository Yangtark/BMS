const bcrypt = require('bcryptjs');

// 设置密码强度 
var salt = bcrypt.genSaltSync(10); 
// HASH值 为加密的密码 
var hash = bcrypt.hashSync('123456',salt);
console.log(hash)

console.log(bcrypt.compareSync('123456', hash))