(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ca5f8e5"],{"4a33":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"bd"}},[i("div",{attrs:{id:"qp"}},[t.show1?i("div",{staticClass:"d-flex flex-column qpanel",attrs:{id:"login"}},[i("strong",{staticClass:"center h1 font-weight-bold"},[t._v("Log in to EasyQ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.vem,expression:"vem"}],staticClass:"inp",attrs:{type:"email",id:"email",placeholder:"Email"},domProps:{value:t.vem},on:{input:function(e){e.target.composing||(t.vem=e.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.vpw,expression:"vpw"}],staticClass:"inp",attrs:{type:"password",id:"pw",placeholder:"Password"},domProps:{value:t.vpw},on:{input:function(e){e.target.composing||(t.vpw=e.target.value)}}}),i("div",{staticClass:"d-flex flex-row inp justify-content-between",attrs:{id:"other"}},[t._m(0),i("span",{attrs:{id:"forgot"}},[i("p",[i("a",{staticClass:"text-primary",on:{click:t.forgotpw}},[t._v("Forgot password?")])])])]),i("div",{staticClass:"btn d-flex justify-content-center"},[i("button",{staticClass:"bt",attrs:{id:"log"},on:{click:t.submitlogin}},[t._v("Log in")]),i("span",{staticClass:"space5"}),i("button",{staticClass:"bt",attrs:{id:"signup"},on:{click:t.signup}},[t._v("Sign Up")])]),t.isFail?i("div",{staticClass:"mt-0 d-flex justify-content-center text-danger"},[t._v(" "+t._s(t.errormsg)+" ")]):t._e(),i("div",{staticClass:"inp4 d-flex justify-content-center"},[i("div",{staticClass:"backrow text-primary",on:{click:t.back2}},[t._v(" Return to Homepage ")])])]):t._e(),t.show1?t._e():i("div",{staticClass:"d-flex flex-column qpanel",attrs:{id:"forgotpanel"}},[i("strong",{staticClass:"center top1 h2"},[t._v("Forgot your password?")]),i("p",{staticClass:"inp"},[t._v(" You can reset your password by entering your email here, and we will send you a link to reset your password. ")]),i("div",{staticClass:"inp2 text-danger"},[t._v(t._s(t.errormsg2))]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.vem2,expression:"vem2"}],staticClass:"inp3",attrs:{id:"email2",placeholder:"Email"},domProps:{value:t.vem2},on:{input:function(e){e.target.composing||(t.vem2=e.target.value)}}}),i("button",{staticClass:"bt2",attrs:{id:"sendem"},on:{click:t.sendemail}},[t._v("Send Link")]),i("div",{staticClass:"inp3 d-flex justify-content-center"},[i("div",{staticClass:"backrow text-primary",on:{click:t.back}},[t._v(" Return to Sign in ")])])])])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{attrs:{id:"remember"}},[i("input",{attrs:{type:"checkbox",id:"vehicle1",name:"vehicle1",value:"Bike"}}),i("label",{attrs:{for:"vehicle1"}},[t._v(" Remember me")]),i("br")])}],n=i("bc3a"),o=i.n(n),r={mounted:function(){l()},data(){return{vem:"",vem2:"",vpw:"",isFail:!1,show1:!0,errormsg:"Login Failed",errormsg2:""}},methods:{async submitlogin(){var t={username:this.vem,password:this.vpw};if(!this.mailvalidation())return this.isFail=!0,this.errormsg="Email Invalid",!1;this.isFail=!1,this.errormsg="Login Failed",c("username",t.username,30);const e=await o.a.post("http://100.25.219.17/api/user/login",t,{headers:{"Content-type":"application/json"}});var i=e.data;1==i.isVerified&&1==i.isMatched?(this.isFail=!1,c("id",i.id,30),c("loggedin","true",30),console.log("check if id is fetched:"+i.id),this.$store.dispatch("Set_User_ID",i.id),"student"==i.role?window.location.href="/StudentHome":"TA"==i.role?window.location.href="/TAHome":"Instructor"==i.role&&(window.location.href="/instructor/main")):0==i.isMatched?this.isFail=!0:window.location.href="/verify"},forgotpw(){this.show1=!1,l()},signup(){window.location.href="/signup"},back2(){window.location.href="/"},async sendemail(){var t={username:this.vem2};const e=await o.a.post("http://100.25.219.17/api/user/reset/forgotPassword",t,{headers:{"Content-type":"application/json"}});var i=e.data;1==i.isUserRegistered?(console.log("true01"),this.errormsg2="We have sent you a link, please check your email"):(console.log("false01"),this.errormsg2="This email has not been registered")},back(){this.show1=!0,l()},mailvalidation(){const t=/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;return t.test(this.vem)}}};function l(){let t=screen.height/3,e=screen.width/2.3;e<450&&(e=450),t<250&&(t=250),document.getElementById("bd").style.paddingTop=.2*(screen.height-t).toString()+"px",document.getElementById("bd").style.paddingBottom=.24*(screen.height-t).toString()+"px",document.getElementById("login").style.height=t.toString()+"px",document.getElementById("forgotpanel").style.height=t.toString()+"px",document.getElementById("forgotpanel").style.marginTop=t*.2.toString()+"px"}function c(t,e,i){const s=new Date;s.setTime(s.getTime()+24*i*60*60*1e3);let a="expires="+s.toUTCString();document.cookie=t+"="+e+";"+a+";path=/"}var d=r,p=(i("7a9b"),i("2877")),m=Object(p["a"])(d,s,a,!1,null,null,null);e["default"]=m.exports},6860:function(t,e,i){},"7a9b":function(t,e,i){"use strict";i("6860")}}]);
//# sourceMappingURL=chunk-4ca5f8e5.3237a100.js.map