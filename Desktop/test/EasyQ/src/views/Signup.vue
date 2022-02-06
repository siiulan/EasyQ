<template>
 <div class = "signup">
   <div class="bg">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
             <h2>Sign up here :)</h2>
          <div class="col-md-8 col-lg-7 col-xl-6">
        <!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image"> -->
         <img :src="LoginImage" class="img-fluid" alt="Phone image" width="1500" height="1500">
          </div>
          
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form @submit.prevent=" handleSignup">
              <!-- Email input -->
              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong> First name </strong></label>
                <input type="text" id="firstname" class="form-control form-control-lg" v-model="input.firstName"/>
              </div>

              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong> Last name </strong></label>
                <input type="text" id="lastname" class="form-control form-control-lg" v-model="input.lastName"/>
              </div>

              <div class="form-outline mb-4">
               <label class="form-label" style="font-size:20px;" for="emailaddr"><strong>Email address </strong></label>
                <input type="email" id="emailaddr" class="form-control form-control-lg" v-model="input.email"/>
              </div>
    
              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="signuppwd"> <strong>Password </strong></label>
                <input type="password" id="loginpwd" class="form-control form-control-lg" v-model="input.pwd" />
              </div>
              <div class="alert alert-danger" role="alert" v-if="typechecked !== true">
                    <p class="text-danger"> * At least 8 characters</p>
                    <p class="text-danger"> * A mixture of both uppercase and lowercases letters </p>
                    <p class="text-danger"> * Contains at least a special character e.g., ! @ # ? ]</p>
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="signuppwdConfirm"> <strong>Confirm Password </strong></label>
                <input type="password" id="loginpwdConfirm" class="form-control form-control-lg" v-model="input.pwdConfirmed" />
              </div>  
              <div class="alert alert-danger" role="alert" v-if="pwdMatched !== true">
                    Password does not match !
              </div>  
              <div class="d-flex justify-content-around align-items-center mb-4">
                <a href="#!"> Already have an account ? Sign in here !</a>
                <!--<router-link :to="{name: 'signup'}"> Don't have an account ? Join Now !</router-link>-->
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
                pwdMatched : true,
                LoginImage : "https://www.ucl.ac.uk/students/sites/students/files/new_students_resized.png",
                regerror:true,
                typechecked : true
            }
        },
        methods:{
            typecheck(){
                console.log('typecheck started')
                var decimal =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
                if(this.input.pwd.length < 8){
                    return false;
                }
                else if(this.input.pwd.match(decimal)){
                    return true;
                }
                else{
                    return false;
                }
            },
   /*async*/  handleSignup() {
               var wit = this.typecheck();
               this.typechecked = wit;
               console.log(this.typechecked)
              /*
              try{
              const response = await axios.post('api/register',{
                firstName:this.firstName,
                lastName:this.lastName,
                username:this.input.email,
                password:this.input.pwd
                },{headers: {'Content-type': 'application/json',}});
              //this.$router.push('login');
              }
              catch{
                this.regerror = true
                this.email = ''
              }*/
              
            }
        }
    }
</script>

<style scoped>
</style>