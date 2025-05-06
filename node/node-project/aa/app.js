const express = require('express')
const app = express()
const port = 3000

let data = [{
  "id": "1",
  "first_name": "Massimiliano",
  "last_name": "Rosoni",
  "email": "mrosoni0@ibm.com",
  "salary": "$9.23",
  "department_id": 10,
  "job_id": "it"
},
{
  "id": "2",
  "first_name": "Rikki",
  "last_name": "Red",
  "email": "rred1@nps.gov",
  "salary": "$9.96",
  "department_id": 20,
  "job_id": "sales"
},
{
  "id": "3",
  "first_name": "Dathadd",
  "last_name": "Loosemore",
  "email": "dloosemore2@behance.net",
  "salary": "$6.59",
  "department_id": 30,
  "job_id": "it"
},
{
  "id": "4",
  "first_name": "길동",
  "last_name": "Loton",
  "email": "eloton3@dagondesign.com",
  "salary": "$3.38",
  "department_id": 10,
  "job_id": "it"
},
{
  "id": "7",
  "first_name": "Robb",
  "last_name": "Gauche",
  "email": "rgauche6@fc2.com",
  "salary": "$8.09",
  "department_id": 10,
  "job_id": "it"
},
{
  "id": "8",
  "first_name": "Ange",
  "last_name": "Leon",
  "email": "aleon7@ucla.edu",
  "salary": "$0.33",
  "department_id": 10,
  "job_id": "sales"
},
{
  "id": "9",
  "first_name": "Odilia",
  "last_name": "Paye",
  "email": "opaye8@rakuten.co.jp",
  "salary": "$6.65",
  "department_id": 20,
  "job_id": "it"
},
{
  "id": "12",
  "first_name": "bb",
  "last_name": "bb",
  "email": "a@a.a",
  "phone_number": "",
  "hire_date": "",
  "job_id": "it",
  "salary": "11",
  "commission_pct": "",
  "manager_id": "",
  "department_id": 30
},
{
  "id": "6",
  "first_name": "Michal",
  "last_name": "Ivanyushkin",
  "email": "mivanyushkin5@hao123.com",
  "salary": "$8.21",
  "department_id": 30,
  "job_id": "it"
},
{
  "id": "5",
  "first_name": "Emmalee",
  "last_name": "Laboune",
  "email": "elaboune4@salon.com",
  "salary": "$8.40",
  "department_id": 20,
  "job_id": "sales"
},
{
  "id": "111",
  "first_name": "Emmalee",
  "last_name": "Laboune",
  "email": "elaboune4@salon.com",
  "salary": "$8.40",
  "department_id": 20,
  "job_id": "sales"
}]


// 전체 조회 REST
app.get('/emp', (req, res) => {
  res.send(data)
})
// 단건 조회
app.get('/emp/:id', (req, res) => {
  let id = req.params.id;
  let result = data.find( (emp)=> emp.id == id);
  if(result)
    res.send(result)
  else
    res.send("not find");

})

// 부서가 10번인 첫번째 사원 find?department_id=20
app.get('/find', (req, res) => {
  let departmentId = req.query.departmentId;
  let result = data.find((emp) => emp.department_id == departmentId);
  if(result)
    res.send(result)
  else
    res.send("not find");
})


app.get('/filter', (req, res) => {
  let jobId = req.query.jobId;
  let result = data.filter((emp) => emp.job_id == jobId);

  if(result.length > 0)
    res.send(result)
  else
    res.send("not find");
})
// job_id가 'it'인 사원만 조회
// firstname 순으로 정렬
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})