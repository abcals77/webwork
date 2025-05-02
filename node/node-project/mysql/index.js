// mysql/index.js
// mysql 모듈 로드 
const mysql = require("mysql2");
const customer = require("./customerSql")
const board = require("./boardSql")
const sqlList = {customer : customer, board : board}

const conn = {
  // 필수
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_LIMIT,
  // 선택
  permitSetMultiParamEntries: true,
  insertIdAsNumber: true,
  bigIntAsNumber: true,
  logger: {
    query: (msg) => console.log(msg),
    error: (err) => console.log(err),
  },
};
// DB 커넥션 생성 
let pool = mysql.createPool(conn);

const query = (table,sql, data) => {
  return new Promise((resolve, reject) => {
    pool.query(sqlList[table][sql], data, (err, result) => {
      if(err) {
        console.log(err)
        reject();
      }
      resolve(result);
    })
  })
}

module.exports = query;

