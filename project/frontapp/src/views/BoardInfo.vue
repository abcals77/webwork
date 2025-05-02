<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">번호</th>
            <td scope="col" class="text-center">{{ boardInfo.id }}</td>
            <th scope="col" class="text-center table-primary">작성일</th>
            <td scope="col" class="text-center">
              {{ boardInfo.created_date }}
            </td>
            <th scope="col" class="text-center table-primary">이름</th>
            <td scope="col" class="text-center">{{ boardInfo.writer }}</td>
          </tr>

          <tr>
            <th colspan="2" class="text-center table-primary">제목</th>
            <td colspan="4">{{ boardInfo.title }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="200">
              <pre
                style="white-space: pre-wrap;
                  border: none;
                  background-color: white; ">{{ boardInfo.content }}</pre>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-center">
              <button class="btn btn-xs btn-info" @click="goToUpdateForm(boardInfo.id)">
                수정
              </button>
              <button class="btn btn-xs btn-info" @click="goToListForm()">
                목록
              </button>
              <button class="btn btn-xs btn-info" @click="goToDelete(boardInfo.id)">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 댓글 -->
    <div class="row">
      <div v-for="comment in boardCommentList">{{ comment.content }}</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  data(){
    return{
      boardInfo: {},
      commentList: [],
      boardCommentList:[]
    }
  },
  created(){
    this.searchNo = this.$route.query.id;
    this.fetchInfo();
  },
  methods:{
    async fetchInfo(){
      let board = await axios.get(`http://localhost:3000/board/${this.searchNo}`);
      this.boardInfo = board.data[0]
    },
    async getCommentList(){
      let comment = await axios.get(`http://localhost:3000/comment`);
      this.commentList = comment.data
      for(let i = 0; i < this.commentList.length; i++){
        if(this.commentList[i].bid == this.searchNo){
          this.boardCommentList.push(this.commentList[i]);
        }
      }
    },  
    goToUpdateForm(id){
      this.$router.push({path:"/boardForm", query:{id:id}});
    },
    goToListForm(){
      this.$router.push({path:"/boardList"});
    },
    async goToDelete(id){
      const url = `http://localhost:3000/board/${id}`;
      const result = await axios.delete(url);
      alert("정상적으로 삭제되었습니다.");
      this.$router.push({path:"/boardList"});
    }
  },
  mounted(){

  }
}

</script>
