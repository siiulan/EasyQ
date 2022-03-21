<template>
 <div class = "AddClass">
   <div class="bg">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="alert alert-danger" v-show="addStatus === false ">
             <strong> Add Class Failed </strong>
          </div>
          <!--
          <div class="alert alert-success" role="alert" v-show="addStatus === true " >
              <strong>Add Class success ! </strong>
          </div>    -->     
            <form @submit.prevent="AddingClass">
              <!-- Email input -->
              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="firstname"><strong> Class Number </strong></label>
                <input type="text" id="firstname" class="form-control form-control-lg" required="required" v-model="input.ClassNum"/>
              </div>

              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="lastname"><strong> Class Name </strong></label>
                <input type="text" id="lastname" class="form-control form-control-lg" required="required" v-model="input.ClassName"/>
              </div>
    
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="classterm"> <strong>Term </strong></label>
                <input type="text" id="classterm" class="form-control form-control-lg" required="required" v-model="input.term"/>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="classinfo"> <strong>Description </strong></label>
                <input type="text" id="classinfo" class="form-control form-control-lg" required="required" v-model="input.ClassDescription" />
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
            addStatus : null,
            User_ID : ""
        }

    },
    methods:{
        async AddingClass(){
             try{
               console.log("print user id:" + this.User_ID);
              const response = await axios.post('http://54.163.38.93/api/user/instructor/addClass',{
                    CLASS_NUMBER: this.input.ClassNum,
                    CLASS_NAME: this.input.ClassName,
                    CLASS_INFO: this.input.ClassDescription,
                    CLASS_TERM: this.input.term,
                    INSTRUCTOR_ID: this.User_ID
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
        },
        created(){
          this.User_ID = this.$store.getters.Get_User_Id;
        }
    }
</script>
