<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">번호</th>
            <td scope="col" class="text-center">{{ bookInfo.book_id }}</td>
            <th scope="col" class="text-center table-primary">출간일</th>
            <td scope="col" class="text-center">
              {{ getDateFormat(bookInfo.created_date) }}
            </td>
            <th scope="col" class="text-center table-primary">저자</th>
            <td scope="col" class="text-center">{{ bookInfo.author }}</td>
          </tr>
          <tr>
            <th scope="col" class="text-center table-primary">ISBN 번호</th>
            <td scope="col" class="text-center">{{ bookInfo.isbn }}</td>
            <th scope="col" class="text-center table-primary">출판사</th>
            <td scope="col" class="text-center">
              {{ bookInfo.publisher }}
            </td>
            <th scope="col" class="text-center table-primary">카테고리</th>
            <td scope="col" class="text-center">{{ bookInfo.category }}</td>
          </tr>
          <tr>
            <th colspan="2" class="text-center table-primary">책 제목</th>
            <td colspan="4">{{ bookInfo.title }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="200">
              <pre
                style="white-space: pre-wrap;
                  border: none;
                  background-color: white; ">{{ bookInfo.description }}</pre>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="200">
              <img :src="bookInfo.cover_image" :alt="bookInfo.title" style="width: 150px; height: auto;"/>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-center">
              <button class="btn btn-xs btn-info" @click="goToUpdateForm(bookInfo.book_id)">
                수정
              </button>
              <button class="btn btn-xs btn-info" @click="goToListForm()">
                목록
              </button>
              <button class="btn btn-xs btn-info" @click="goToDelete(bookInfo.book_id)">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';


export default{
  data(){
    return{
      searchNo: null,
      bookInfo: {},
    }
  },
  created(){
    this.searchNo = this.$route.query.id;
    this.fetchInfo();
  },
  methods:{
    async fetchInfo(){
      let book = await axios.get(`/api/book/${this.searchNo}`);
      this.bookInfo = book.data[0]
    },
    goToUpdateForm(id){
      this.$router.push({path:"/bookUpdateForm", query:{id:id}});
    },
    goToListForm(){
      this.$router.push({path:"/bookList"});
    },
    async goToDelete(id){
      const url = `/api/book/${id}`;
      const result = await axios.delete(url);
      alert("정상적으로 삭제되었습니다.");
      this.$router.push({path:"/bookList"});
    },
    getDateFormat(date) {
      const d = new Date(date);
      return isNaN(d) ? "-" : d.toISOString().slice(0, 10);
    }
  },
  mounted(){

  }
}

</script>
