const fs = require('fs');
// 비동기
fs.readFile("c:/temp/data.txt","utf-8" ,function(err,data){
  console.log(data);
})
console.log("the end")