<template>
  <div class="container">
    <h2>고객관리</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>이메일</th>
          <th>전화번호</th>
          <th>주소</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, idx) in customerList" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.address }}</td>
        </tr>
        <tr v-if="customerList.length === 0">
          <td colspan="5" class="text-center">고객 정보가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customerList: []
    };
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:3000/customer');
      this.customerList = res.data;
    } catch (err) {
      console.error("고객 목록 불러오기 실패:", err);
      alert("고객 목록을 불러오는 데 실패했습니다.");
    }
  }
};
</script>