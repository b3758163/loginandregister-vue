<template>
  <div>
    <el-row>
      <el-col :span="10">
        <FormList list_type="performed"></FormList>
      </el-col>
      <el-col :span="14">
        <FormContent list_type="performed"></FormContent>
        <br><br>
        <el-button type="success" @click="performed">标记处理</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FormList from "@/views/Components/FormList";
import FormContent from "@/views/Components/FormContent";
import {EventBus} from "@/event-bus";
export default {
  name: "ProcessForm",
  components:{FormList,FormContent},
  methods:{
    performed() {
      EventBus.$emit("processForm")
    }
  }
}
</script>

<style scoped>

</style>