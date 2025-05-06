<template>
  <div>
    <h4>댓글 등록</h4>
    <div>
      <label>작성자:</label>
      <input type="text" v-model="writer" />
    </div>
    <div>
      <label>내용:</label>
      <textarea v-model="content"></textarea>
    </div>
    <button @click="submitComment">등록</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ["bid"],
  data() {
    return {
      writer: "",
      content: ""
    };
  },
  methods: {
    async submitComment() {
      if (!this.writer || !this.content) {
        alert("작성자와 내용을 입력하세요.");
        return;
      }

      const commentData = {
        writer: this.writer,
        content: this.content,
        bid: this.bid
      };

      try {
        const res = await axios.post("http://localhost:3000/comment", commentData);
        alert("댓글이 등록되었습니다.");
        
        // 초기화
        this.writer = "";
        this.content = "";

        // 부모 컴포넌트 댓글 불러오기 emit
        this.$emit("commentAdded");

      } catch (err) {
        console.error("댓글 등록 실패:", err);
        alert("댓글 등록에 실패했습니다.");
      }
    }
  }
};
</script>