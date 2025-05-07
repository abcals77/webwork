<template>
  email <input v-model="email">
  pw <input v-model="pw">
  <button class="btn btn-xs btn-info" @click="loginHandler()">로그인</button>
</template>

<script>
import axios from 'axios';

export default{
  data(){
    return{
      email:"",
      pw:""
    }
  },
  created(){
    
  },
  methods:{
    async loginHandler(){
      // this.$store.commit('increment');
      // this.$store.commit('changeLoginyn');
      // this.$store.commit('changeEmail',{email:this.email});
      this.$store.dispatch('login',{email:this.email})
      const url="/api/users/login"
      const data = {email : this.email, pw : this.pw}
      const result = await axios.post(url, data);
      console.log(`email : ${this.email}`)
      console.log(`pw : ${this.pw}`)
      alert(result.data.code)
      // if(result.data.code ==="success")
      this.$router.push({path:"/"})
    }
  }
}
</script>