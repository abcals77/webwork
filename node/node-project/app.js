const express = require('express')
const app = express()
const axios = require('axios')
const port = 3000

const url = 'http://localhost:3000'

app.get('/emp', (req, res) => {
  res.send('main hello!')
})
// 부서가 10번인 첫번째 사원 조회 (find 사용)
app.get('/find', async (req, res) => {
  try {
    const response = await axios.get(`${url}/emp`);
    const empList = response.data;

    // 배열의 find() 기능으로 department_id가 10인 첫 사원 찾기
    const foundEmp = empList.find(emp => emp.department_id === 10);

    if (foundEmp) {
      res.json(foundEmp);
    } else {
      res.status(404).send('No employee found in department 10');
    }
  } catch (error) {
    console.error('Error in /find:', error);
    res.status(500).send('Internal Server Error');
  }
});
// job_id가 'it'인 사원만 조회
app.get('/filter', async (req, res) => {
  try {
    const response = await axios.get(`${url}/emp`);
    const empList = response.data;

    // 배열의 filter() 기능으로 job_id가 'it'인 사원만 필터링
    const itEmpList = empList.filter(emp => emp.job_id === 'it');

    res.json(itEmpList);
  } catch (error) {
    console.error('Error in /filter:', error);
    res.status(500).send('Internal Server Error');
  }
});
// firstname 순으로 정렬
app.get('/nameList', async (req, res) => {
  try {
    const response = await axios.get(`${url}/emp`);
    const empList = response.data;

    // 배열의 sort() 기능으로 first_name 기준 오름차순 정렬
    const sortedList = empList.sort((a, b) => {
      if (a.first_name < b.first_name) return -1;
      if (a.first_name > b.first_name) return 1;
      return 0;
    });

    res.json(sortedList);
  } catch (error) {
    console.error('Error in /nameList:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})