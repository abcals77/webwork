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
    <div>
      <CommentComp :bid="boardInfo.id" @commentAdded="getCommentList"/>
    </div>
    <div class="row">
      <div v-if="boardCommentList.length === 0">
        <p>댓글이 없습니다.</p>
      </div>
      <div v-else>
        <div v-for="(comment, idx) in boardCommentList" :key="idx" style="display: flex; align-items: center;">
          <strong style="margin-right: 8px;">{{ comment.writer }}</strong>: {{ comment.content }}
          <button class="btn btn-xs btn-danger" @click="deleteComment(comment.id)" style="margin-left: 10px;">삭제</button>
        </div>
      </div>
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
      searchNo: null,
      boardInfo: {},
      commentList: [],
      boardCommentList:[]
    }
  },
  created(){
    this.searchNo = this.$route.query.id;
    this.fetchInfo();
    this.getCommentList();
  },
  methods:{
    async fetchInfo(){
      let board = await axios.get(`/api/board/${this.searchNo}`);
      this.boardInfo = board.data[0]
    },
    async getCommentList(){
      let comment = await axios.get(`/api/comment/${this.searchNo}`);

      this.boardCommentList = comment.data;
    },  
    goToUpdateForm(id){
      this.$router.push({path:"/boardForm", query:{id:id}});
    },
    goToListForm(){
      this.$router.push({path:"/boardList"});
    },
    async goToDelete(id){
      const url = `/api/board/${id}`;
      const result = await axios.delete(url);
      alert("정상적으로 삭제되었습니다.");
      this.$router.push({path:"/boardList"});
    },
    async deleteComment(id) {
      if (confirm("이 댓글을 삭제하시겠습니까?")) {
        try {
          await axios.delete(`/api/comment/${id}`);
          alert("댓글이 삭제되었습니다.");
          this.getCommentList();
        } catch (err) {
          console.error("댓글 삭제 실패:", err);
          alert("댓글 삭제에 실패했습니다.");
        }
      }
    }
  },
  mounted(){

  }
}

</script>
