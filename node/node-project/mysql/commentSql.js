// customerSql.js
const sqlList = {
  selectList : "SELECT * FROM comment where bid = ?",
  insertInfo : "insert comment set ?",
  updateInfo : "update comment set ? where id = ?",
  deleteInfo : "delete from comment where id = ?"
}

module.exports = sqlList;