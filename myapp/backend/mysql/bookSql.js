// bookSql.js
const sqlList = {
  selectList : "SELECT * FROM book_info ORDER BY book_id DESC LIMIT ?, ?",
  selectCount: "SELECT COUNT(*) AS total FROM book_info",
  selectById : "SELECT * FROM book_info where book_id = ?",
  insertInfo : "insert book_info set ?",
  updateInfo : "update book_info set ? where book_id = ?",
  deleteInfo : "delete from book_info where book_id = ?"
}

module.exports = sqlList;