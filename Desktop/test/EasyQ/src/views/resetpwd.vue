<template>
 <section class="vh-100">
  <div class="container py-5 h-100">
   <div class="row d-flex justify-content-center align-items-center h-100">
    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
      <div class="card shadow-2-strong" style="border-radius: 1rem;">          
        <div class="card-body p-5" >
            <h3 class="mb-5"> Reset your password </h3>
             <div class="alert alert-danger" role="alert" v-if="typechecked !== true">
                    <p class="text-danger"> * At least 8 characters</p>
                    <p class="text-danger"> * A mixture of both uppercase and lowercases letters </p>
                    <p class="text-danger"> * Contains at least a special character e.g., ! @ # ? ]</p>
              </div>
            <form @submit.prevent="handleReset">
    
              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="resetpwd"> <strong>New Password </strong></label>
                <input type="password" id="resetpwd" class="form-control form-control-lg" v-model="input.pwd" />
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" style="font-size:20px;" for="resetpwdConfirm"> <strong>Confirm Password </strong></label>
                <input type="password" id="resetpwdConfirm" class="form-control form-control-lg" v-model="input.pwdConfirmed" />
              </div>  
              <div class="alert alert-danger" role="alert" v-if="pwdMatched !== true">
                    Password does not match !
              </div>  
              <div class="d-flex justify-content-around align-items-center mb-4 float-left">
                <!--<router-link to = "/signin" >return to sign in </router-link> -->
              </div>
    
              <!-- Submit button -->
              <div class="col-xs-3">
              <button type="submit" class="btn btn-warning mr-2 btn-lg btn-block"> Reset password </button>
              </div>
            </form>
           </div>
         </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
//mport LoginImage from '/Users/rextang/Desktop/FEvue/vue-first-app/src/assets/login-image.png'
    export default {
        data() {
            return {
                email : null,
                input: {
                pwd : '',
                pwdConfirmed : ''
                },
                pwdMatched : true,
                reseterror:true,
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
   /*async*/  handleReset() {
               var wit = this.typecheck();
               this.typechecked = wit;
               console.log(this.typechecked)
              /*
              try{
              const response = await axios.post('api/resetpwd',{
                password:this.input.pwd
                },{headers: {'Content-type': 'application/json',}});
              //this.$router.push('Homepage');
              }
              catch{
                this.reseterror = true
              }*/
              
            }
        }
    }
</script>

<style scoped>
</style>