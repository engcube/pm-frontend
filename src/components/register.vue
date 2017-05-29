<template>
<div class="register" id="register">
    <a href="javascript:;" class="log-close"></a>
    <div class="log-bg">
        <div class="log-logo">Register!</div>
    </div>
    <div class="log-email">
        <input type="text" placeholder="Email" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account"><input type="text" placeholder="UserName" :class="'log-input' + (username==''?' log-input-empty':'')" v-model="username"><input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
        <a href="javascript:;" class="log-btn" @click="register">Register</a>
        <a class="log-btn"><router-link to="/login">Back to Login</router-link></a>
    </div>
    <Loading v-if="isLoging" marginTop="-30%"></Loading>
</div>
</template>

<script>
import Loading from './Loading.vue'
export default {
  name: 'Register',
  data () {
    return {
      isLoging: false,
      account: '',
      username: '',
      password: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    register () {
      if (this.account !== '' && this.username !== '' && this.password !== '') {
        this.toRegister()
      }
    },
    toRegister () {
      // 设置在登录状态
      this.isLoging = true
      // 请求后端,比如:
      let apiurl = 'http://' + global.API_SERVER + '/api/' + global.API_VERSION + '/user'
      this.$http.post(apiurl, {Email: this.account, Password: this.password, Username: this.username}, {timeout: 3000}).then(res => {
        if (res.body.hasOwnProperty('Error')) {
          console.log(res.body)
          this.isLoging = false
          return
        } else {
          console.log('success')
        }
        console.log(res.body)
        global.UserID = res.body.UserID
        console.log(global.UserID)
        this.isLoging = false
        this.$router.push('/chat/')
      }, res => {
        console.log('http post error')
      })
    }
  }
}
</script>

<style scoped>
.register{position: fixed; overflow: hidden;left: 50%; margin-left: -250px; top:50%; margin-top: -350px; width: 500px; min-height: 555px; z-index: 10; right: 140px; background: #fff;-webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px; -webkit-box-shadow:  0px 3px 16px -5px #070707; box-shadow:  0px 3px 16px -5px #070707}
.log-close{display: block; position: absolute; top:12px; right: 12px; opacity: 1;}
.log-bg{background: url(../assets/images/login-bg.jpg); width: 100%; height: 312px; overflow: hidden;}
.log-logo{height: 80px; margin: 120px auto 25px; text-align: center; color: #1fcab3; font-weight: bold; font-size: 40px;}
.log-text{color: #57d4c3; font-size: 13px; text-align: center; margin: 0 auto;}
.log-logo,.log-text{z-index: 2}
.close{height:16px;width:16px;background-position:-13px 0;}
.login-email{height:17px;width:29px;background-position:-117px 0;}
.log-btns{padding: 15px 0; margin: 0 auto;}
.log-btn{width:402px; display: block; text-align: left; line-height: 50px;margin:0 auto 15px; height:50px; color:#fff; font-size:13px;-webkit-border-radius: 5px; background-color: #3B5999;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px;
position: relative;}
.log-btn.tw{background-color: #13B4E9}
.log-btn.email{background-color: #50E3CE}
.log-btn:hover,.log-btn:focus{color: #fff; opacity: .8;}
.log-email{text-align: center; margin-top: 20px;}
.log-email .log-btn{background-color: #50E3CE;text-align: center;}
.log-input-empty{border: 1px solid #f37474 !important;}
.isloading{background: #d6d6d6}
.log-btn .text{left: 95px; line-height: 50px; text-align: left; position: absolute;}
.log-input{width: 370px;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; -webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px;}
.log-input.warn{border: 1px solid #f88787}
 @-webkit-keyframes cloud1 {  
    0%{left: 200px}  
    100%{left:-130px;} 
}
@keyframes cloud1{
    0%{left: 200px}  
    100%{left:-130px;} 
}
 @-webkit-keyframes cloud2 {  
    0%{left:500px;}  
    100%{left:-90px;} 
}
@keyframes cloud2{
    0%{left:500px;}  
    100%{left:-90px;} 
}
@-webkit-keyframes cloud3 {  
    0%{left:620px;}  
    100%{left:-70px;} 
}
@keyframes cloud3{
    0%{left:620px;}  
    100%{left:-70px;} 
}@-webkit-keyframes cloud4 {  
    0%{left:100px;}  
    100%{left:-70px;} 
}
@keyframes cloud4{
    0%{left:100px;}  
    100%{left:-70px;} 
}
</style>

