<template>
 <div class = "signup">
   <div class="bg">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <h2 class="display-5"> Sign up </h2>
          <div class="col-md-8 col-lg-7 col-xl-6">
        <!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image"> -->
         <img :src="LoginImage" class="img-fluid" alt="Phone image" width="1500" height="1500">
          </div>         
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div class="alert alert-danger" v-show="regerror === true && pwdMatched === false">
             <strong>Sign up Failure : passwords don't match </strong>
            </div>
            <div class="alert alert-danger" v-show="regerror === true && typechecked === false">
             <strong>Sign up Failure : password in wrong format </strong>
            </div>
            <div class="alert alert-danger" v-show="regerror === true && emailvalid === false">
             <strong>Sign up Failure : email invalid </strong>
            </div>
            <div class="alert alert-danger" v-show="regerror === true && isReg === true">
             <strong>Sign up Failure : This account already exists </strong>
            </div>
            <form @submit.prevent=" handleSignup">
              <!-- Email input -->
              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong> First name </strong></label>
                <input type="text" id="firstname" class="form-control form-control-lg" required="required" v-model="input.firstName"/>
              </div>

              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong> Last name </strong></label>
                <input type="text" id="lastname" class="form-control form-control-lg" required="required" v-model="input.lastName"/>
              </div>

              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong>Email address </strong></label>
                <input type="email" id="emailaddr" class="form-control form-control-lg" required="required" v-model="input.email" @blur="mailvalidation"/>
              </div>
              <div class="alert alert-danger" role="alert" v-if="emailvalid == false">
                    <p class="text-danger"> invalid format of email address</p>
              </div>
    
              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="signuppwd"> <strong>Password </strong></label>
                <input type="password" id="loginpwd" class="form-control form-control-lg" required="required" v-model="input.pwd"/>
              </div>
              <div class="alert alert-danger" role="alert" v-if="typechecked !== true">
                    <p class="text-danger"> * At least 8 characters</p>
                    <p class="text-danger"> * A mixture of both uppercase and lowercases letters </p>
                    <p class="text-danger"> * Contains at least a special character e.g., ! @ # ? ]</p>
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="signuppwdConfirm"> <strong>Confirm Password </strong></label>
                <input type="password" id="loginpwdConfirm" class="form-control form-control-lg" required="required" v-model="input.pwdConfirmed" />
              </div>  
              <div class="alert alert-danger" role="alert" v-bind = "mailvalid" v-if="pwdMatched !== true">
                    Password does not match !
              </div>  
              <div class="d-flex justify-content-around align-items-center mb-4">
                
                <router-link to = "/signin" > Already have an account ? Sign in here ! </router-link>
              </div>
    
              <!-- Submit button -->
              <div class="col-xs-3">
              <button type="submit" class="btn btn-warning mr-2 btn-lg btn-block"> Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
// import LoginImage from '/Users/xushuoni/Desktop/login-image copy.png'
import axios from 'axios'
    export default {
        data() {
            return {
                input: {
                firstName : null,
                lastName : null,
                email : null,
                pwd : '',
                pwdConfirmed : ''
                },
                emailvalid : null, //email validation
                pwdMatched : true, //if confimed pwd matches the original
                LoginImage : "https://www.ucl.ac.uk/students/sites/students/files/new_students_resized.png",
                regerror:null,
                typechecked : true, //for pwd type check
                isReg : null
            }
        },
        methods:{
            mailvalidation(){
              const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
              this.emailvalid = emailRegex.test(this.input.email);
              console.log(this.mailvalid)
            },
            typecheck(){
                var decimal =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
                if(this.input.pwd.length < 8){
                    this.typechecked = false;
                }
                else if(this.input.pwd.match(decimal)){
                    this.typechecked = true;
                }
                else{
                    this.typechecked = false;
                }
            },
            ifMatchPwd(){
              if(this.pwd == this.pwdConfirmed){
                this.pwdMatched = true;
              }
              else{
                this.pwdMatched = false;
              }            
            },
   async    handleSignup() {
              try{
              this.typecheck();
               //console.log(this.typechecked);
              this.ifMatchPwd();
              if(this.typechecked == false || this.emailvalid == false || this.pwdMatched == false ){
                throw "validation failed"
              }
              const response = await axios.post('http://http://54.163.38.93/api/user//registration',{
                username:this.input.email,
                password:this.input.pwd,
                firstname:this.input.firstName,
                lastname:this.input.lastName,
                },{headers: {'Content-type': 'application/json',}});
               if(response.data.isRegistered === true){

                this.regerror = true;
                this.isReg == true;
                return false;//onsubmit === false
               }
               else {
                  this.regerror = false;
                  this.$router.push('/signuplink');
               }
              }
              catch{
                this.regerror = true;
                return false; //onsubmit === false
              }
              
            }
        }
    }
</script>

<style scoped>
</style>
