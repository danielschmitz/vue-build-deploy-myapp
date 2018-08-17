<template>
  <div>
    <form>
      <input type="email" name="email" id="email" v-model="email" placeholder="Email" size="30">
      <br/> <br/>
      <input type="password" name="password" id="password" v-model="password" placeholder="Password" size="30">
      <br/> <br/>
      <button type="button" @click="tryLogin()">Login</button>
    </form>
  </div>
</template>

<script>
import login from '@/services/login';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    tryLogin() {  
      //console.log('try login with', this.email, this.password);
      console.log(process.env.VUE_APP_ROOT_API);
      login.tryLogin(this.email, this.password).then( result => {
        console.log('result', result);
      }, error => {
        console.log('error',error);
      })
    }
  }
};
</script>
