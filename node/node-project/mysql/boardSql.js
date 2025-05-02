// boardSql.js
const sqlList = {
  selectList : "SELECT * FROM board",
  selectById : "SELECT * FROM board where id = ?",
  insertInfo : "insert board set ?",
  updateInfo : "update board set ? where id = ?",
  deleteInfo : "delete from board where id = ?"
}

module.exports = sqlList;