<template>
<div class="container-fluid py-5 h-100">
<div class="alert alert-info" role="alert">
  Invitation Code : {{this.invitation_code}}
</div>
<button class="btn btn-warning mr-2 btn-lg btn-block" style ="position: absolute; bottom: 0;right:0;" > 
             <router-link to='/instructor/main'>  Return   </router-link>
  </button>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
        CourseID : null,
        invitation_code : null
        }
    },
    methods:{
        async AddStudent(){
            console.log("this.courseID: " + this.CourseID);
            
            const res = await axios.post('http://54.163.38.93/api/user/instructor/getStudentInvitationCode',
                    {
                        class_id : this.CourseID
                    },{headers: {'Content-type': 'application/json',}});
            console.log("invitation_code:" + res.data.invitation_code);
            this.invitation_code = res.data.invitation_code;
        }

    },
    created(){
        this.CourseID = this.$route.params.CLASSID;
        this.AddStudent();
    }
}
</script>

<style scoped>

</style>
