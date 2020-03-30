var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('product', { aindex: 3 });
});

router.post('/addAction', upload.single('ppic'), (req, res, next) => {
  /**
   * req.body --- 获取post提交的表单数据
   * req.query --- 获取get提交的数据
   * req.file --- 获取到提交的文件信息
   */
  // res.send({
  //   file: req.file,
  //   data: req.body
  // })
  /**
   * {
   * "fieldname":"ppic",
   * "originalname":"bg.jpg",
   * "encoding":"7bit",
   * "mimetype":"image/jpeg",
   * "destination":"uploads/",
   * "filename":"e4718151a15bdc539725ee2e58e51413", 
   * "path":"uploads\\e4718151a15bdc539725ee2e58e51413",
   * "size":40752
   * }
   */
  // 此时发现uploads文件夹内部的文件没有后缀名，需要用代码实现更改服务器文件夹uploads内部文件的后缀  ---   需要 node核心模块fs文件系统模块的 rename方法
  let oldName = './uploads/' + req.file.filename;
  let types = req.file.originalname.split('.'); // a.b.c.d.jpg

  let newName = './uploads/' + req.file.filename + '.' + types[types.length - 1]
  fs.rename(oldName, newName, (err) => {
    if (err) throw err;
    res.send('上传成功')
  })
})
module.exports = router;
