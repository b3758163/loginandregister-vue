<template>
  <div>
    <br><br>
    <el-table :data="formList" highlight-current-row @row-click="rowClick">
      <el-table-column prop="id" label="id" width="40"></el-table-column>
      <el-table-column prop="title" label="表单标题"></el-table-column>
      <el-table-column prop="approve" label="审核状态"></el-table-column>
      <el-table-column prop="performed" label="处理状态"></el-table-column>
      <el-table-column prop="completed" label="是否结束"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {EventBus} from "@/event-bus";
import {getAllForm, getSelfForms} from "@/api/api"

export default {
  name: "FormList",
  props: ["list_type"],
  data() {
    return {
      formList: [
        {
          id: 1,
          title: "biaoti",
          content: "asclkvajksdhfkjasd",
          audit: "true", process: true,
          finish: false,
          createTime: "2023年10月6日21:27:18"
        }]
    }
  },
  methods: {
    rowClick(row) {
      console.log(row)
      EventBus.$emit("formChange", JSON.stringify(row))
    },
    getFormList() {
      if (this.list_type) {
        let param = {};
        if (this.list_type === "self") {
          param = {page: 1, userId: this.$store.getters.getUserInfo.id}
        }else if(this.list_type === "approve")
        {
          param = {page:1,approve:0}
        }else if(this.list_type ==="performed"){
          param= {page:1,approve:1,performed:0,route:this.$store.getters.getUserInfo.id}
        }
        getSelfForms(param).then(res => {
          this.formList = res.data.records
        })
      } else {
        getAllForm({page: 1}).then(res => {
          this.formList = res.data.records
        })
      }
      return true
    }

  },
  mounted() {
    this.getFormList();
    //localStorage.removeItem("formInfo")
    EventBus.$on("updateFormList", () => {
      this.getFormList()
    })
  },
  destroyed() {
    console.log("des")
    EventBus.$off()
  }
}
</script>

<style scoped>

</style>