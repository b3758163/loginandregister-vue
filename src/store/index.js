import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName:'',
    identity:'',
    tokens:'',
    userInfo:''
  },
  getters: {
    getUserName:state => state.userName,
    getIdentity:state => state.identity,
    getTokens:state =>state.tokens,
    getUserInfo:state =>state.userInfo
  },
  mutations: {
    setUserName(state,userName){
      state.userName = userName
    },
    setIdentity(state,identity){
      state.identity = identity
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo
    },
    setTokens(state,tokens){
      state.tokens = tokens
    }
  },
  actions: {
  },
  modules: {
  }
})
