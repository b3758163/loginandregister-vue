<template>
    <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo">
      <el-menu-item v-for="menu in menuList" :key="menu.id" :index="menu.id" :route="menu.url">
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>

    </el-menu>
</template>

<script>
import {EventBus} from "@/event-bus";
import {getUserPages} from "@/api/api";

export default {
  name: "Navigation",
  data(){
    return{
      menuList:[
      ],
    }
  },
  mounted() {
    console.log("navi初始化")
    EventBus.$on("getPages",()=>{
      //console.log({email:this.$store.getters.getUserInfo.email})
      getUserPages({email:this.$store.getters.getUserInfo.email}).then(res=>{
        console.log("menuelist")
        this.menuList = res.data
      })
    })
  },
  destroyed() {
    EventBus.$off("getPages")
  }
}
</script>

<style scoped>

</style>