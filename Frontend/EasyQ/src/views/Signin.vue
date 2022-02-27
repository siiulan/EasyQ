<template>
  <div id="bd">
    <div id="qp">
      <div id="login" class="d-flex flex-column qpanel" v-if="show1">
        <strong class="center h1 font-weight-bold">Log in to EasyQ</strong>
        <input type="email" class="inp" id="email" placeholder="Email" v-model="vem" />
        <input type="password" class="inp" id="pw" placeholder="Password" v-model="vpw"/>
        <div id="other" class="d-flex flex-row inp justify-content-between">
          <span id="remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1"> Remember me</label><br />
          </span>
          <span id="forgot">
            <p>
              <a class="text-primary" @click="forgotpw">Forgot password?</a>
            </p>
          </span>
        </div>
        <div class="btn d-flex justify-content-center">
          <button class="bt" id="log" @click="submitlogin">Log in</button>
          <span class="space5"></span>
          <button class="bt" id="signup" @click="signup">Sign Up</button>
        </div>
        <div class="mt-0 d-flex justify-content-center text-danger" v-if="isFail">
          {{errormsg}}
        </div>
        <div class="inp4 d-flex justify-content-center">
          <div class="backrow text-primary" @click="back2">
            Return to Homepage
          </div>
        </div>
      </div>
      <div id="forgotpanel" class="d-flex flex-column qpanel" v-if="!show1">
        <strong class="center top1 h2">Forgot your password?</strong>
        <p class="inp">
          You can reset your password by entering your email here, and we will
          send you a link to reset your password.
        </p>
        <div class="inp2 text-danger">{{errormsg2}}</div>
        <input class="inp3" id="email2" placeholder="Email" v-model="vem2" />
        <button class="bt2" id="sendem" @click="sendemail">Send Link</button>
        <div class="inp3 d-flex justify-content-center">
          <div class="backrow text-primary" @click="back">
            Return to Sign in
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted: function () {
    resize();
  },
  data() {
    return {
      vem: "",
      vem2: "",
      vpw: "",
      isFail: false,
      show1: true,
      errormsg: "Login Failed",
      errormsg2: "",
    };
  },
  methods: {
    async submitlogin() {
      var data = {
        username: this.vem,
        password: this.vpw,
      };
      if (!this.mailvalidation()) {
        this.isFail = true;
        this.errormsg = "Email Invalid";
        return false;
      } else {

        this.isFail = false;
        this.errormsg = "Login Failed";
      }
      setCookie("username", data.username, 30);
      setCookie("password", data.password, 30);

      /*
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://54.163.38.93/api/user/login", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onloadend = function () {
        console.log(xhr.responseText);
        var data2 = JSON.parse(xhr.responseText);
        if (data2.isVerified == true && data2.isMatched == true) {
          this.isFail = false;
          window.location.href = "/";
        } else if (data2.isMatched == false) {
          this.isFail = true;
        } else {
          window.location.href = "/verify";
        }
      };
      xhr.send(JSON.stringify(data));
      */
      
      const response = await axios.post('http://54.163.38.93/api/user/login', data,{headers: {'Content-type': 'application/json',}});
      var data2 = response.data;
      if (data2.isVerified == true && data2.isMatched == true) {
        this.isFail = false;
        window.location.href = "/";
      } else if (data2.isMatched == false) {
        this.isFail = true;
      } else {
        window.location.href = "/verify";
      }
      
    },
    forgotpw() {
      this.show1 = false;
      resize();
    },
    signup() {
      window.location.href = "/signup";
    },
    back2() {
      window.location.href = "/";
    },
    async sendemail() {
      var data2 = {
        username: this.vem2,
      };
      /*
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://54.163.38.93/api/user/reset/forgotPassword", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onloadend = function () {
        console.log(xhr.responseText);
        var data2 = JSON.parse(xhr.responseText);
        console.log(data2);
        console.log(data2.isUserRegistered);
        if (data2.isUserRegistered == true) {
          console.log("true01");
          this.errormsg2 = "We have sent you a link, please check your email";
        } else {
          console.log("false01");
          this.errormsg2 = "This email has not been registered";
        }
      };
      xhr.send(JSON.stringify(data2));
      */

      const response = await axios.post('http://54.163.38.93/api/user/reset/forgotPassword', data2,{headers: {'Content-type': 'application/json',}});
      var data3 = response.data;
      if (data3.isUserRegistered == true) {
        console.log("true01");
        this.errormsg2 = "We have sent you a link, please check your email";
      } else {
        console.log("false01");
        this.errormsg2 = "This email has not been registered";
      }

    },
    back() {
      this.show1 = true;
      resize();
    },
    mailvalidation(){
      const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
      return emailRegex.test(this.vem);
    },
  },
};

//resize();
function resize() {
  let h1 = screen.height / 3;
  let w1 = screen.width / 2.3;
  if (w1 < 450) {
    w1 = 450;
  }
  if (h1 < 250) {
    h1 = 250;
  }

  document.getElementById("bd").style.paddingTop =
    0.2 * (screen.height - h1).toString() + "px";
  document.getElementById("bd").style.paddingBottom =
    0.24 * (screen.height - h1).toString() + "px";

  document.getElementById("login").style.height = h1.toString() + "px";
  document.getElementById("forgotpanel").style.height = h1.toString() + "px";
  document.getElementById("forgotpanel").style.marginTop =
    h1 * (0.2).toString() + "px";

}
/*
function getCookie() {
  return document.cookie.split(';').slice(-1)[0];
}
*/
//https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

</script>
<style>
#bd {
  background-image: url("https://www.u-bordeaux.com/var/ezdemo_site/storage/images/media/university-of-bordeaux/images/partners/waterloo-sp-webpage/404068-2-fre-FR/Waterloo-SP-webpage_Grande.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  overflow-x:scroll;
  white-space:nowrap;
}

.qpanel {
  background-color: white;
  border-radius: 20px;
  min-width:450px;
  width:34vw;
  margin-left: 33vw;

}

.center {
  text-align: center;
}
.inp {
  margin-top: 15px;
  margin-left: 10%;
  margin-right: 10%;
  height: 15%;
}
.bt {
  color: white;
  background-color: #6495ed;
  width: 40%;
}
.space5 {
  width: 5%;
}
.backrow {
  height: 10%;
  text-decoration: underline;
}

.inp2 {
  margin-top: 15px;
  margin-left: 10%;
  margin-right: 10%;
  height: 10%;
}
.inp3 {
  margin-top: 5px;
  margin-left: 10%;
  margin-right: 10%;
  height: 15%;
}
.inp4 {
  margin-top: 1px;
  margin-left: 10%;
  margin-right: 10%;
  height: 15%;
}
.bt2 {
  color: white;
  background-color: #6495ed;
  margin-top: 10px;
  margin-left: 10%;
  margin-right: 10%;
  height: 15%;
}
.top1 {
  margin-top: 1%;
}

</style>
