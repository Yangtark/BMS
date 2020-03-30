const sql = {
  /**
   * 
   * @param {*} Collection 
   * @param {*} insertObj 
   */
  insert (Collection, insertObj) {
    return new Promise((resolve, reject) => {
      Collection.insertMany(insertObj, (err) => {
        if (err) throw err;
        // console.log('插入成功')
        resolve();
      })
    })
  },
  /**
   * 
   * @param {String} Collection 集合名称
   * @param {Object} deleteObj 删除的条件
   * @param {Number} type 如果为1，删除多条数据，否则删除单条数据
   */
  delete (Collection, deleteObj, type) {
    return new Promise((resolve, reject) => {
      let deleteType = 'deleteOne';
      type === 1 ? deleteType = 'deleteMany' : deleteType = 'deleteOne';
      Collection[deleteType](deleteObj, (err) => {
        if (err) throw err;
        resolve()
      })
    })
  },
  update (Collection, whereObj, updateObj, type) {
    return new Promise((resolve, reject) => {
      let updateType = 'updateOne';
      type === 1 ? updateType = 'updateMany' : updateType = 'updateOne';
      Collection[updateType](whereObj, updateObj, (err) => {
        if (err) throw err;
        resolve()
      })
    })
  },
  find (Collection, whereObj, showObj) {
    return new Promise((resolve, reject) => {
      Collection.find(whereObj, showObj).exec((err, data) => {
        if (err) throw err;
        resolve(data)
      })
    })
  },
  pagging (Collection, whereObj, showObj, limitNum, pageCode) {
    return new Promise((resolve, reject) => {
      Collection.find(whereObj, showObj).limit(limitNum).skip((pageCode - 1) * limitNum).exec((err, data) => {
        if (err) throw err;
        resolve(data)
      })
    })
  }
}

module.exports = sql;