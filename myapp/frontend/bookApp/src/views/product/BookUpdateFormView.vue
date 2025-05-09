<template>
  <div class="container">
    <form @submit.prevent>
      <div v-if="this.searchNo > 0"> 
        <label for="no">No.</label>
        <input type="text" id="no" :value="bookInfo.book_id" readonly />
      </div>
      <label for="isbn">ISBN 번호</label>
      <input type="text" id="isbn" v-model="bookInfo.isbn"/>
      <div>
        <label for="publish_date">출간일</label>
        <input type="date" id="publish_date" v-model="bookInfo.publish_date"/>
      </div>
      <label for="title">책 제목</label>
      <input type="text" id="title" v-model="bookInfo.title"/>
      <label for="writer">저자</label>
      <input type="text" id="publisher" v-model="bookInfo.author"/>
      <label for="publisher">출판사</label>
      <input type="text" id="writer" v-model="bookInfo.publisher"/>
      <label for="category">카테고리</label>
      <input type="text" id="category" v-model="bookInfo.category"/>
      <label for="content">책 소개</label>
      <textarea
        id="content"
        style="height: 200px"
        v-model="bookInfo.description"
      ></textarea>
      <div v-if="this.searchNo > 0"> 
        <label for="regdate">등록일자</label>
        <input type="text" v-bind:value="dateFormat" readonly />
      </div>
      <button
        type="button"
        class="btn btn-xs btn-info"
        style="margin-right : 10px;"
        @click="saveBook(bookInfo.book_id)"
      >
        저장
      </button>
      <button
        type="button"
        class="btn btn-xs btn-info"
        @click="goToBookInfo(bookInfo.book_id)"
      >
        취소
      </button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default{
  data(){
    return{
      bookInfo: {}
    }
  },  
  created(){
    this.searchNo = this.$route.query.id || "";
    if(this.searchNo > 0){
      this.fetchInfo();
    }
  },
  computed:{
    dateFormat(){
      // 날짜 포맷
      const date = new Date(this.bookInfo.created_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  },
  methods:{
    async fetchInfo(){
      let book = await axios.get(`/api/book/${this.searchNo}`);
      this.bookInfo = book.data[0]
      console.log(this.bookInfo)
    },
    goToBookInfo(id){
      // query: ?id=1 param : boardInfo/1
      this.$router.push({path:"/bookInfo", query:{id:id}});
    },
    async saveBook(id){
      const url = "/api/book";
      let param = {
        isbn: this.bookInfo.isbn,
        publish_date : this.bookInfo.publish_date,
        title: this.bookInfo.title,
        author: this.bookInfo.author,
        publisher: this.bookInfo.publisher,
        category: this.bookInfo.category,
        description: this.bookInfo.description
      };
      // 수정
      if(id>0){
        const result = await axios.put(`${url}/${id}`, param);
        alert("정상적으로 수정되었습니다.");
        this.$router.push({path: "/bookList"});
      }else{
        // 등록
        const result = await axios.post(url, param);
        alert("정상적으로 등록되었습니다.");
        this.$router.push({path:"/bookList"});
      }
    }
  }
}
</script>

<style scoped>
/* Style inputs with type="text", select elements and textareas */
input[type="text"],
select,
textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
button[type="button"] {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
button[type="button"]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
