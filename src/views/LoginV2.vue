<template>
  <div>
    <h1>欢迎{{$route.query.username}}来到首页2</h1>
<!--    <template>-->
<!--      <amplify-authenticator>-->
<!--        <div>-->
<!--          My App-->
<!--          <amplify-sign-out></amplify-sign-out>-->
<!--        </div>-->
<!--      </amplify-authenticator>-->
<!--    </template>-->
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();

      try {
        await Auth.signIn(this.username, this.password);
        // 登录成功后的操作
      } catch (error) {
        // 处理登录失败的情况
        console.error('Login error:', error);
      }
    },
  },
};
</script>

<style scoped>

</style>