<template>
 <div class = "AddClass">
   <div class="bg">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="alert alert-danger" v-show="addStatus === false ">
             <strong> Add Class Failed </strong>
          </div>
          <div class="alert alert-success" role="alert" v-show="addStatus === true " >
              <strong>Add Class success ! </strong>
          </div>
          <div class="col-md-8 col-lg-7 col-xl-6">
          </div>         
            <div class="alert alert-danger" v-show="regerror === true && isReg === true">
             <strong>Sign up Failure : This account already exists </strong>
            </div>
            <form @submit.prevent="AddingClass">
              <!-- Email input -->
              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong> Class Number </strong></label>
                <input type="text" id="firstname" class="form-control form-control-lg" required="required" v-model="input.ClassNum"/>
              </div>

              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong> Class Name </strong></label>
                <input type="text" id="lastname" class="form-control form-control-lg" required="required" v-model="input.ClassName"/>
              </div>
    
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="signuppwd"> <strong>Term </strong></label>
                <input type="password" id="loginpwd" class="form-control form-control-lg" required="required" v-model="input.term"/>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="signuppwdConfirm"> <strong>Description </strong></label>
                <input type="password" id="loginpwdConfirm" class="form-control form-control-lg" required="required" v-model="input.ClassDescription" />
              </div>  
              <!-- Submit button -->
              <div class="col-xs-3">
              <button type="submit" class="btn btn-warning mr-2 btn-lg btn-block"> Add Class </button>
              </div>
            </form>
          </div>
          <button class="btn btn-warning mr-2 btn-lg btn-block" style ="position: absolute; bottom: 0;right:0;" > 
             <router-link to='/instructor/main'>  Return   </router-link>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            input: {
                ClassNum:null,
                ClassName: null,
                ClassDescription : null,
                term : null
            },
            addStatus : null

        }

    },
    methods:{
        async AddingClass(){
             try{
              const response = await axios.post('http://54.163.38.93/api/instructor/addclass',{
                    CLASS_NUMBER: this.ClassNum,
                    CLASS_NAME: this.ClassName,
                    CLASS_INFO: this.input.ClassDescription,
                    CLASS_TERM: this.input.term,
                    INSTRUCTOR_ID: '0'

                },{headers: {'Content-type': 'application/json',}});
               if(response.data.success === true){
                 this.addStatus = true;
                 this.$router.push('/instructor/CourseAddSuccess');
               }
               else {
                 this.addStatus = false;
                 throw "add class failed";
               }
              }
              catch{
                return false; //onsubmit === false
              }             
         }
        }
    }
</script>
