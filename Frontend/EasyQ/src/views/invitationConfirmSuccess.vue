<template>
  <div id="main" class="d-flex flex-column">
    <div class="cente d-flex flex-column">
        <div class="mb-3 h-25 h3">TA Registeration</div>
        <div class="h-25 h5">{{name}}</div>
        <div class="mt-3 w-100 d-flex flex-row">
            <div class="mt-1 col-xl-3" >First Name:</div>
            <input class="ms-1 mt-0 w-100" v-model="first_name"/>
        </div>
        <div class="mt-3 w-100 d-flex flex-row">
            <div class="mt-1 col-xl-3" >Last Name:</div>
            <input class="ms-1 mt-0 w-100" v-model="last_name"/>
        </div>
        <div class="mt-3 w-100 d-flex flex-row">
            <div class="mt-1 col-xl-3" >Password:</div>
            <input type="password" class="ms-1 mt-0 w-100" v-model="password"/>
        </div>
        <div class="mt-3 w-100 d-flex flex-row">
            <div class="mt-1 col-xl-3" >Confirmation Password:</div>
            <input type="password" class="ms-1 mt-3 w-100 h-50" v-model="password2"/>
        </div>
        <div class="mt-1 w-100 cente text-danger text-center" v-if="isFail">{{errormsg}}</div>
        <button class="cente mt-3 btn btn-warning col-xl-3" @click="register">Register</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted: function () {
    this.getInfo();
  },
  data() {
    return {
        token: this.$route.params.invitation_token,
        first_name: '', 
        last_name: '', 
        password: '',
        password2: '',
        isFail: false,
        success: '',
        exist: '',
        errormsg: '',
    };
  },
  methods: {
    async register() {
      if (this.password != this.password2) {
        this.isFail = true;
        this.errormsg = "Invalid confirmation password!";
        return false;
      }
      if (this.typecheck() == false) {
        this.isFail = true;
        this.errormsg = "Invalid password!";
        return false;
      }
      var data = {
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password2,
      };
      const response = await axios.post('http://54.163.38.93/api/user/instructor/unregisteredInvitationConfirmation/', data,{headers: {'Content-type': 'application/json',}});
      this.success = response.data.success;
      this.exist = response.data.exist;
      if (this.success == true) {
        window.location.href = "/TAConfirm/success";
      } else {
          if (this.exist == true) {
            this.isFail = true;
            this.errormsg = "You have already in class!";
          } else {
            window.location.href = "/TAConfirm/fail";   
          }
      }
    },
    typecheck(){
        var decimal =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        if(this.password.length < 8){
            return false;
        }
        else if(this.password.match(decimal)){
            return true;
        }
        else{
            return false;
        }
    },
  },
};

</script>
<style>
#main {
    width: 100%;
    height: 100%;
    position: fixed;
}
.cente {
    align-self:center;
}
</style>