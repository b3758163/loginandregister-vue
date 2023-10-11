<template>
  <div>
    <el-row>
      <el-col :span="10">
        <FormList list_type="self"></FormList>
      </el-col>
      <el-col :span="14">
        <FormContent list_type="self"></FormContent>
        <br><br>
        <el-button @click="performed" type="success">标记完成</el-button>
        <el-button @click="updateForm" type="success">更新</el-button>
        <el-button @click="deleteForm" type="danger">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FormList from "@/views/Components/FormList";
import FormContent from "@/views/Components/FormContent";
import {EventBus} from "@/event-bus";

export default {
  name: "FinishForm",
  components: {FormList, FormContent},
  methods: {
    performed() {
      EventBus.$emit("finishForm")
    },
    deleteForm() {
      EventBus.$emit("deleteForm")
    },
    updateForm() {
      EventBus.$emit("updateForm1")
    }
  }
}
</script>

<style scoped>

</style>