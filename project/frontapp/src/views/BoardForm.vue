<template>
  <div class="container">
    <form @submit.prevent>
      <div v-if="this.searchNo > 0"> 
        <label for="no">No.</label>
        <input type="text" id="no" :value="boardInfo.id" readonly />
      </div>
      <label for="title">제목</label>
      <input type="text" id="title" v-model="boardInfo.title"/>

      <label for="writer">작성자</label>
      <input type="text" id="writer" v-model="boardInfo.writer"/>

      <label for="content">내용</label>
      <textarea
        id="content"
        style="height: 200px"
        v-model="boardInfo.content"
      ></textarea>
      <div v-if="this.searchNo > 0"> 
        <label for="regdate">작성일자</label>
        <input type="text" v-bind:value="dateFormat" readonly />
      </div>
      <button
        type="button"
        class="btn btn-xs btn-info"
        @click="saveBoard(boardInfo.id)"
      >
        저장
      </button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default{
  data(){
    return{
      boardInfo: {}
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
      const date = new Date(this.boardInfo.created_date);
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
      let board = await axios.get(`/api/board/${this.searchNo}`);
      this.boardInfo = board.data[0]
      console.log(this.boardInfo)
    },
    async saveBoard(id){
      const url = "/api/board";
      let param = {
        title: this.boardInfo.title,
        content: this.boardInfo.content,
        writer: this.boardInfo.writer
      };
      // 수정
      if(id>0){
        const result = await axios.put(`${url}/${id}`, param);
        alert("정상적으로 수정되었습니다.");
        this.$router.push({path: "/boardList"});
      }else{
        // 등록
        const result = await axios.post(url, param);
        alert("정상적으로 등록되었습니다.");
        this.$router.push({path:"/boardList"});
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
