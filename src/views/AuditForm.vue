<template>
  <div>
    <el-row>
      <el-col :span="10">
        <FormList list_type="approve"></FormList>
      </el-col>
      <el-col :span="14">
        <FormContent list_type="approve"></FormContent>
        <br>
        <el-button type="success" @click="approve">通过</el-button>
        <br>
        <br>
        <el-button type="danger" @click="reject">拒绝</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FormList from "@/views/Components/FormList";
import FormContent from "@/views/Components/FormContent";
import {EventBus} from "@/event-bus";

export default {
  name: "AuditForm",
  components: {FormList,FormContent},
  methods:{
    approve(){
      this.sendApprove(true)
    },
    reject(){
      this.sendApprove(false)
    },
    sendApprove(res){
      EventBus.$emit("auditForm",JSON.stringify({res:res}))
    }
  }
}
</script>

<style scoped>

</style>