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
            <button class="btn btn-xs btn-info" @click="goToAdd">
              등록
            </button>
          </td>
        </tr>
      </tbody>  
    </table>
    <div class="text-center my-2">
      <button class="btn btn-sm btn-outline-primary mx-1"
        v-for="i in countInPages" :key="i"
        :class="{ active: startPage + i - 1 === page.page }"
        @click="moveToPage(startPage + i - 1)">
        {{ startPage + i - 1 }}
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  data(){
    return{
      books: [],
      page: {
      page: 1,
      total: 0
    },
    count: 5,
    defaultPages: 5
    }
  },
  created(){
    this.fetchList();
  },
  methods:{
    async fetchList(){
      let result = await axios.get(`/api/book?page=${this.page.page}&count=${this.count}`);
      this.books = result.data.list;
      this.page.total = result.data.total;
    },
    goToDetail(id){
      // query: ?id=1 param : boardInfo/1
      this.$router.push({path:"/bookInfo", query:{id:id}});
    },
    getDateFormat(date) {
      const d = new Date(date);
      return isNaN(d) ? "-" : d.toISOString().slice(0, 10);
    },
    goToAdd(){
      // query: ?id=1 param : boardInfo/1
      this.$router.push({path:"/bookUpdateForm"});
    },
    moveToPage(p) {
      this.page.page = p;
      this.fetchList();
    }
  },
  mounted(){
  
  },
  computed: {
    totalPage() {
      return Math.floor(this.page.total / this.count) + ((this.page.total % this.count) === 0 ? 0 : 1);
    },
    startPage() {
      return Math.floor((this.page.page - 1) / this.defaultPages) * this.defaultPages + 1;
    },
    countInPages() {
      let remain = this.totalPage - (this.startPage - 1);
      return remain < this.defaultPages ? remain : this.defaultPages;
    }
  }
}
</script>

<style scoped>
table * {
  text-align: center;
}
</style>
