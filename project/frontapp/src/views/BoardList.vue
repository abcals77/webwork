<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(board, i) in boards" :key="board.id" @click="goToDetail(board.id)">
          <td>{{ board.id }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ board.created_date }}</td>
          <td>{{ board.comment }}</td>
        </tr>
        <tr>
            <td colspan="6" class="text-center">
              <button class="btn btn-xs btn-info" @click="goToAddForm()">
                등록
              </button>
            </td>
          </tr>
      </tbody>
    </table>
    <div>
      <CommentComp :bid="boardInfo.id"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import CommentComp from "@/components/CommentComp.vue";

export default{
  components : {CommentComp},
  data(){
    return{
      boards: [],
      boardInfo:{}
    }
  },
  created(){
    this.fetchList();
  },
  methods:{
    async fetchList(){
      let result = await axios.get(`http://localhost:3000/board`);
      this.boards = result.data;
    },
    goToDetail(id){
      // query: ?id=1 param : boardInfo/1
      this.$router.push({path:"/boardInfo", query:{id:id}});
    },
    getDateFormat(date){
      return this.$dateFormat(date);
    },
    goToAddForm(){
      this.$router.push({path:"/boardForm"});
    }
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
