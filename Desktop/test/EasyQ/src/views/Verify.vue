<template>
  <div id="bd">
    <div id="qp">
      <div id="forgotpanel" class="d-flex flex-column qpanel">
        <strong class="center top1 h2">Verify your account</strong>
        <p class="inp">
          Enter your email here, and we will send you a link so you can verify
          your account.
        </p>
        <div class="inp2 text-danger">Enter your email</div>
        <input class="inp3" id="email2" placeholder="Email" v-model="vem2" />
        <button class="bt2" id="sendem" @click="sendemail">Send Link</button>
        <div class="inp3 d-flex justify-content-center">
          <div class="backrow text-primary" @click="back2">
            Return to Homepage
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
    back2() {
      window.location.href = "/";
    },
    sendemail() {
      var data2 = {
        username: this.vem2,
      };
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/user/reset/forgotPassword", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data2));
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
  border-radius: 20px;
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
