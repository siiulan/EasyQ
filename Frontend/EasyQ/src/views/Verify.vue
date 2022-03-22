<template>
  <div id="bd">
    <div id="qp">
      <div id="forgotpanel" class="d-flex flex-column qpanel">
        <strong class="center top1 h2">Verify your account</strong>
        <p class="inp">
          We will send you a link to your email so you can verify
          your account.
        </p>
        <div id="emailtext" class="inp2 text-danger"></div>
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
    var em = getCookie("username");
    console.log(em);
    document.getElementById("emailtext").textContent = "Click button to send a link to "+em;
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
        email: getCookie("username")
      };
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://100.25.219.17/api/user/verify/resend", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data2));
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

  document.getElementById("forgotpanel").style.height = h1.toString() + "px";
  document.getElementById("forgotpanel").style.marginTop =
    h1 * (0.2).toString() + "px";

  //document.getElementById("forgotpanel").style.width = "auto";
  document.getElementById("forgotpanel").style.marginRight =
    0.5 * (screen.width - w1).toString() + "px";
  document.getElementById("forgotpanel").style.marginLeft =
    0.5 * (screen.width - w1).toString() + "px";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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
  min-width: 450px;
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
  margin-top: 35px;
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
  margin-top: 7%;
}
</style>
