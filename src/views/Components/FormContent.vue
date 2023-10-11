<template>
  <div>
    <br><br>
    <label for="" style="margin-top: 10px">标题</label>
    <el-input v-model="form.title" :disabled="!editable"></el-input>
    <label for="">内容</label>
    <el-input v-model="form.content" :disabled="!editable" type="textarea" :rows="20"></el-input>
    <div>创建时间：{{ form.createTime }}</div>
    <div v-if="list_type==='approve'">
      <el-select v-model="form.route" default-first-option>
        <el-option v-for="item in staffList" :key="item.id" :label="item.email" :value="item.id"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import {EventBus} from "@/event-bus";
import {approve, performed, reject, completed, getAllStaff, deleteForm, updateForm} from "@/api/api";

export default {
  name: "FormContent",
  props:['list_type'],
  data() {
    return {
      form: {},
      staffList:{},
      editable:false
    }
  },
  methods: {
    updateFormList() {
      EventBus.$emit("updateFormList", {})
    },
    initStaffList(){
      getAllStaff().then(res=>{
        this.staffList = res.data
      })
    }
  },
  mounted() {
    if(this.list_type==="approve"){
      this.initStaffList();
    }
    if(this.list_type==="self"){
      this.editable = true
    }
    EventBus.$on("formChange", (data) => {
      this.form = JSON.parse(data)
    })
    EventBus.$on("auditForm", (data) => {
      var parse = JSON.parse(data);
      if (this.form.id) {
        if (parse.res) {
          approve(this.form).then(() => {
            this.form = {}
            this.updateFormList()
          })
        } else {
          reject({id: this.form.id}).then(() => {
            this.form = {}
            this.updateFormList()
          })
        }
      }
    })

    EventBus.$on("processForm", () => {
      console.log("processForm")
      if(this.form.id){
        performed(this.form).then(()=>{
          this.form = {}
          this.updateFormList()
        })
      }
    })
    EventBus.$on("finishForm", () => {
      if(this.form.performed===1){
        console.log("finishForm")
        if(this.form.id){
          completed(this.form).then(()=>{
            this.form = {}
            this.updateFormList()
          })
        }
      }else{
        this.$message.error("表单还没有执行")
      }
    })
    EventBus.$on("deleteForm",()=>{
      console.log("delete")
      if(this.form.id){
        deleteForm(this.form).then(()=>{
          this.form = {}
          this.$message.success("删除成功")
          this.updateFormList()
        })
      }
    })
    //console.log("updateFomr1")
    EventBus.$on("updateForm1",()=>{
      //console.log("update")
      if(this.form.id){
        //console.log("update")
        updateForm(this.form).then(()=>{
          this.$message.success("更新成功")
          this.updateFormList()
        })
      }
    })
  },
  destroyed() {
    EventBus.$off()
  }
}
</script>

<style scoped>

</style>