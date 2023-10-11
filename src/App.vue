<template>
  <div>
    <template>
<!--      <div id="google_btn"></div>-->

<!--      <el-button @click="loginGoogle">asdasd</el-button>-->
      <amplify-authenticator style="margin:0;padding:0">
        <el-row style="height:50px;background-color: #009dff;text-align: center;size:35px;" >
          <el-col :span="4"><div style="color:white;font-size: 30px;text-align: left">表单管理系统</div></el-col>
          <el-col :span="17"><div>email:{{this.$store.getters.getUserInfo.email}}<br>
            role:{{role}}
          </div></el-col>
          <el-col :span="1"><amplify-sign-out></amplify-sign-out></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"> <Navigation></Navigation></el-col>
          <el-col :span="21"><router-view style="height:100vh"/></el-col>
        </el-row>
      </amplify-authenticator>
    </template>
  </div>
</template>
<script>
//import gapi from 'gapi-client';
import jwt_decode from "jwt-decode";
import {getUserInfo} from "@/api/api";
import {Amplify, Auth, Hub} from "aws-amplify";
import Navigation from "@/views/Components/Navigation";
import {EventBus} from "@/event-bus";
//import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
export default {
  components:{Navigation},
  computed:{
    role(){
      if(this.$store.getters.getUserInfo.role){
        return this.$store.getters.getUserInfo.role.name
      }else{
        return "none"
      }
    },
    // email(){
    //   if(this.$store.getters.getUserInfo.role){
    //     return this.$store.getters.getUserInfo.role.name
    //   }else{
    //     return "none"
    //   }
    // }
  },
  data() {
    return {
      googleSignInParams: {
        client_id: "374981876730-upksmv66t08onukfno6folg3e7ihh7o7.apps.googleusercontent.com"
      },
      profile: null,
      error: null,
    }
  },
  methods: {
    test(){
      let session = Auth.currentSession().then(res=>{console.log(res)
      console.log(jwt_decode(res.idToken.jwtToken))});
     // console.log(JSON.stringify(session))
    },
    initUserInfo(){
      Auth.currentSession().then(res=>{console.log(res)
        this.$store.commit('setTokens',res)
        getUserInfo(res.idToken.jwtToken).then(user=>{
          console.log(user.data);
          this.$store.commit('setUserInfo',user.data)
          setTimeout(()=>{EventBus.$emit("getPages")},500)
          ;
        })
        console.log(jwt_decode(res.idToken.jwtToken))}
      );
    }
  },
  mounted() {
    this.initUserInfo();
    Hub.listen('auth', async ({payload: {event, data}}) => {

      const user = Auth.currentAuthenticatedUser();
      console.log("登錄成功")
      //console.log(user)
// 检查用户是否已绑定 Google 账号
      if (!user.attributes.googleUserId) {
        // 用户尚未绑定 Google 账号
        if (user.signInMethod === 'EXTERNAL_PROVIDER' && user.provider === 'Google') {
          // 用户已经使用 Google 登录，可以选择绑定 Google 账号
          const googleUserId = 'Google 用户 ID 或标识';
          // 执行绑定操作，将 Google 用户 ID 与用户的 Cognito 身份关联起来
          await Auth.updateUserAttributes(user, {'custom:googleUserId': googleUserId});
          // 更新用户的绑定状态
          user.attributes.googleUserId = googleUserId;
          console.log(user)
        }
      }
    });
    // google.accounts.id.initialize({
    //   client_id: this.googleSignInParams.client_id,
    //   callback: this.handleCredentialResponse,
    //   scope: 'profile openid email'
    // });
    // const parent = document.getElementById('google_btn');
    // google.accounts.id.renderButton(parent, {theme: "filled_blue"});
    // google.accounts.id.prompt();
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#{
  margin:0;
  padding:0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
