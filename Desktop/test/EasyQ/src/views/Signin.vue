<template>
  <div id="bd">
    <div id="qp d-flex">
      <div id="login" class="d-flex flex-column qpanel" v-if="show1">
        <strong class="center h1 font-weight-bold">Log in to EasyQ</strong>
        <input class="inp" id="email" placeholder="Email" v-model="vem" />
        <input class="inp" id="pw" placeholder="Password" v-model="vpw" />
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
        <div
          class="mt-0 d-flex justify-content-center text-danger"
          v-if="isFail"
        >
          Login Failed
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
        <div class="inp2 text-danger">Enter your email</div>
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
export default {
  mounted: function () {
    resize();
  },
  el: "#qp",
  data() {
    return {
      vem: "",
      vem2: "",
      vpw: "",
      isFail: false,
      show1: true,
    };
  },
  methods: {
    submitlogin() {
      var data = {
        username: this.vem,
        password: window.btoa(this.vpw),
      };
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/login", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onloadend = function () {
        var data2 = JSON.parse(xhr.responseText);
        if (data2.isVerified == true && data2.isMatched == true) {
          this.isFail = false;
          window.location.href = "/";
        } else {
          this.isFail = true;
        }
      };
      xhr.send(JSON.stringify(data));
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
    sendemail() {
      var data2 = {
        email: this.vem2,
      };
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/sendemail", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data2));
    },
    back() {
      this.show1 = true;
      resize();
    },
  },
};

//resize();
function resize() {
  let h1 = screen.height / 3;
  let w1 = screen.width / 2.3;
  if (w1 < 400) {
    w1 = 400;
  }
  if (h1 < 250) {
    h1 = 250;
  }

  document.getElementById("bd").style.paddingTop =
    0.2 * (screen.height - h1).toString() + "px";
  document.getElementById("bd").style.paddingBottom =
    0.24 * (screen.height - h1).toString() + "px";

  document.getElementById("login").style.height = h1.toString() + "px";

  document.getElementById("login").style.width = "auto";
  document.getElementById("login").style.marginRight =
    0.5 * (screen.width - w1).toString() + "px";
  document.getElementById("login").style.marginLeft =
    0.5 * (screen.width - w1).toString() + "px";

  document.getElementById("forgotpanel").style.height = h1.toString() + "px";
  document.getElementById("forgotpanel").style.marginTop =
    h1 * (0.2).toString() + "px";

  document.getElementById("forgotpanel").style.width = "auto";
  document.getElementById("forgotpanel").style.marginRight =
    0.5 * (screen.width - w1).toString() + "px";
  document.getElementById("forgotpanel").style.marginLeft =
    0.5 * (screen.width - w1).toString() + "px";
}
</script>
<style>
#bd {
  background-image: url("https://www.u-bordeaux.com/var/ezdemo_site/storage/images/media/university-of-bordeaux/images/partners/waterloo-sp-webpage/404068-2-fre-FR/Waterloo-SP-webpage_Grande.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.qpanel {
  background-color: white;
  border-radius: 10px;
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
