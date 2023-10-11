<template>
  <div>
    <br><br>
    <el-date-picker
        v-model="form.targetTime"
        type="date"
        placeholder="目标时间">
    </el-date-picker>

    <br><br>
    <label for="">标题</label>

    <el-input v-model="form.title"></el-input>
    <label for="">内容</label>
    <el-input v-model="form.content" type="textarea" rows="20"></el-input>

    <el-button type="primary" @click="addForm">提交</el-button>
  </div>
</template>

<script>
import {addForm} from "@/api/api";

export default {
  name: "CreateForm",
  data() {
    return {
      form: {
        title: null,
        content: null,
        targetTime: null,
        userId: this.$store.getters.getUserInfo.id
      }
    }
  },
  methods: {
    addForm() {
      addForm(this.form).then((res) => {
        this.$message.success("添加成功" + res.message)
        console.log(this.$store.getters.getUserInfo.id)
        this.form = {
          title: null,
          content: null,
          targetTime: null,
          userId: this.$store.getters.getUserInfo.id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>