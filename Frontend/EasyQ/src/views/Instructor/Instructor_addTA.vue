<template>
<div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="alert alert-danger" v-show="addStatus === false ">
             <strong> Add TA Failed </strong>
          </div>
            <form @submit.prevent="AddTA">
              <div class="alert alert-warning" role="alert" v-show="TAexist === 1">
                  This account has already been registered as TA in this course.
              </div>
              <!-- Email input -->
              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong> Email Address </strong></label>
                <input type="text" id="emailaddr" class="form-control form-control-lg" required="required" v-model="input.Email"/>
              </div>
    
              <!-- Submit button -->
              <div class="col-xs-3">
              <button type="submit" class="btn btn-warning mr-2 btn-lg btn-block"> Add as TA </button>
              </div>
            </form>
        </div>
    </div>
</template>

<script> 
import axios from 'axios'
export default {
    data(){
        return{
            input: {
                Email : null,
            },
            CourseID : null,
            addStatus : null,
            TAexist : null

        }

    },
    methods:{
        async AddTA(){
             try{
               console.log("course id: " + this.CourseID);
               console.log("email: " + this.input.Email);
              const response = await axios.post('http://100.25.219.17/api/user/instructor/classAddTA',{
                    email_adress : this.input.Email,
                    class_id : this.CourseID
                },{headers: {'Content-type': 'application/json',}});
                console.log("success: " + response.data.success);
                console.log("exist: " + response.data.exist);
               if(response.data.success === true && response.data.exist === true){
                 this.TAexist = 0;
                 this.addStatus = true;
                 this.$router.push('/instructor/addTASuccess');
               }
               else if(response.data.success === false && response.data.exist === true){
                 this.TAexist = 1;
               }
               else if(response.data.success === true && response.data.exist === false){
                 this.TAexist = 0;
                 this.addStatus = true;
                 this.$router.push('/instructor/addTAVerification');

               }
               else {
                 this.addStatus = false;
                 throw "add TA failed";
               }
              }
              catch{
                return false; //onsubmit === false
              }             
        }
    },
    created(){
        //this.addStatus = null;
        this.CourseID = this.$route.params.CLASSID;
        //this.AddTA();
    }
}
</script>

<style scoped>
</style>