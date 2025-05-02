// customerSql.js
const sqlList = {
  selectList : "SELECT * FROM customers",
  selectById : "SELECT * FROM customers where id = ?",
  insertInfo : "insert customers set ?",
  updateInfo : "update customers set ? where id = ?",
  deleteInfo : "delete from customers where id = ?"
}

module.exports = sqlList;