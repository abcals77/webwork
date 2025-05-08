<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>책 제목</th>
          <th>저자</th>
          <th>출간일</th>
          <th>카테고리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, i) in books" :key="book.book_id" @click="goToDetail(book.book_id)">
          <td>{{ book.book_id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ getDateFormat(book.publish_date) }}</td>
          <td>{{ book.category }}</td>
        </tr>
        <tr>
            <td colspan="6" class="text-center">
              <button class="btn btn-xs btn-info" @click="">
                등록
              </button>
            </td>
          </tr>
      </tbody>  
    </table>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  data(){
    return{
      books: []
    }
  },
  created(){
    this.fetchList();
  },
  methods:{
    async fetchList(){
      let result = await axios.get(`/api/book`);
      this.books = result.data;
    },
    goToDetail(id){
      // query: ?id=1 param : boardInfo/1
      this.$router.push({path:"/bookInfo", query:{id:id}});
    },
    getDateFormat(date) {
      const d = new Date(date);
      return isNaN(d) ? "-" : d.toISOString().slice(0, 10);
    }
    // goToAddForm(){
    //   this.$router.push({path:"/boardForm"});
    // }
  },
  mounted(){
  
  }
}
</script>

<style scoped>
table * {
  text-align: center;
}
</style>
