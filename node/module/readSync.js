// readSync.js
const fs = require('fs');
var text = fs.readFileSync("c:/temp/data.txt","utf-8");
console.log(text)
console.log("the end")