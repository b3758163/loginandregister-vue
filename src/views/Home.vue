<template>
  <div>
    total:{{s.total}} within:{{s.within}} later:{{s.later}}
    <FormList></FormList>
  </div>
</template>

<script>
import FormList from "@/views/Components/FormList";
import {formStatic} from "@/api/api";
export default {
  name:"home",
  components:{FormList},
  data(){
    return{
      s:{}
    }
  },
  mounted() {
    formStatic().then(res=>{
      this.s = res.data
    })
  }
}
</script>
<style scoped>

</style>
