(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9f47"],{"34c3":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"signup"},[a("div",{staticClass:"bg"},[a("div",{staticClass:"container py-5 h-100"},[a("div",{staticClass:"row d-flex align-items-center justify-content-center h-100"},[a("h2",{staticClass:"display-5"},[t._v(" Sign up ")]),a("div",{staticClass:"col-md-8 col-lg-7 col-xl-6"},[a("img",{staticClass:"img-fluid",attrs:{src:t.LoginImage,alt:"Phone image",width:"1500",height:"1500"}})]),a("div",{staticClass:"col-md-7 col-lg-5 col-xl-5 offset-xl-1"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.regerror&&!1===t.pwdMatched,expression:"regerror === true && pwdMatched === false"}],staticClass:"alert alert-danger"},[a("strong",[t._v("Sign up Failure : passwords don't match ")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.regerror&&!1===t.typechecked,expression:"regerror === true && typechecked === false"}],staticClass:"alert alert-danger"},[a("strong",[t._v("Sign up Failure : password in wrong format ")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.regerror&&!1===t.emailvalid,expression:"regerror === true && emailvalid === false"}],staticClass:"alert alert-danger"},[a("strong",[t._v("Sign up Failure : email invalid ")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.regerror&&!0===t.isReg,expression:"regerror === true && isReg === true"}],staticClass:"alert alert-danger"},[a("strong",[t._v("Sign up Failure : This account already exists ")])]),a("form",{on:{submit:function(e){return e.preventDefault(),t.handleSignup.apply(null,arguments)}}},[a("div",{staticClass:"form-outline mb-4"},[t._m(0),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input.firstName,expression:"input.firstName"}],staticClass:"form-control form-control-lg",attrs:{type:"text",id:"firstname",required:"required"},domProps:{value:t.input.firstName},on:{input:function(e){e.target.composing||t.$set(t.input,"firstName",e.target.value)}}})]),a("div",{staticClass:"form-outline mb-4"},[t._m(1),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input.lastName,expression:"input.lastName"}],staticClass:"form-control form-control-lg",attrs:{type:"text",id:"lastname",required:"required"},domProps:{value:t.input.lastName},on:{input:function(e){e.target.composing||t.$set(t.input,"lastName",e.target.value)}}})]),a("div",{staticClass:"form-outline mb-4"},[t._m(2),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input.email,expression:"input.email"}],staticClass:"form-control form-control-lg",attrs:{type:"email",id:"emailaddr",required:"required"},domProps:{value:t.input.email},on:{blur:t.mailvalidation,input:function(e){e.target.composing||t.$set(t.input,"email",e.target.value)}}})]),0==t.emailvalid?a("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[a("p",{staticClass:"text-danger"},[t._v(" invalid format of email address")])]):t._e(),a("div",{staticClass:"form-outline mb-4"},[t._m(3),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input.pwd,expression:"input.pwd"}],staticClass:"form-control form-control-lg",attrs:{type:"password",id:"loginpwd",required:"required"},domProps:{value:t.input.pwd},on:{input:function(e){e.target.composing||t.$set(t.input,"pwd",e.target.value)}}})]),!0!==t.typechecked?a("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[a("p",{staticClass:"text-danger"},[t._v(" * At least 8 characters")]),a("p",{staticClass:"text-danger"},[t._v(" * A mixture of both uppercase and lowercases letters ")]),a("p",{staticClass:"text-danger"},[t._v(" * Contains at least a special character e.g., ! @ # ? ]")])]):t._e(),a("div",{staticClass:"form-outline mb-4"},[t._m(4),a("input",{directives:[{name:"model",rawName:"v-model",value:t.input.pwdConfirmed,expression:"input.pwdConfirmed"}],staticClass:"form-control form-control-lg",attrs:{type:"password",id:"loginpwdConfirm",required:"required"},domProps:{value:t.input.pwdConfirmed},on:{input:function(e){e.target.composing||t.$set(t.input,"pwdConfirmed",e.target.value)}}})]),!0!==t.pwdMatched?a("div",t._b({staticClass:"alert alert-danger",attrs:{role:"alert"}},"div",t.mailvalid,!1),[t._v(" Password does not match ! ")]):t._e(),a("div",{staticClass:"d-flex justify-content-around align-items-center mb-4"},[a("router-link",{attrs:{to:"/signin"}},[t._v(" Already have an account ? Sign in here ! ")])],1),t._m(5)])])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"form-label",staticStyle:{"font-size":"20px"},attrs:{for:"emailaddr"}},[a("strong",[t._v(" First name ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"form-label",staticStyle:{"font-size":"20px"},attrs:{for:"emailaddr"}},[a("strong",[t._v(" Last name ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"form-label",staticStyle:{"font-size":"20px"},attrs:{for:"emailaddr"}},[a("strong",[t._v("Email address ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"form-label",staticStyle:{"font-size":"20px"},attrs:{for:"signuppwd"}},[a("strong",[t._v("Password ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"form-label",staticStyle:{"font-size":"20px"},attrs:{for:"signuppwdConfirm"}},[a("strong",[t._v("Confirm Password ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-xs-3"},[a("button",{staticClass:"btn btn-warning mr-2 btn-lg btn-block",attrs:{type:"submit"}},[t._v(" Sign up")])])}],r=a("bc3a"),n=a.n(r),l={data(){return{input:{firstName:null,lastName:null,email:null,pwd:"",pwdConfirmed:""},emailvalid:null,pwdMatched:!0,LoginImage:"https://www.ucl.ac.uk/students/sites/students/files/new_students_resized.png",regerror:null,typechecked:!0,isReg:null}},methods:{mailvalidation(){const t=/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;this.emailvalid=t.test(this.input.email)},typecheck(){var t=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;this.input.pwd.length<8?this.typechecked=!1:this.input.pwd.match(t)?this.typechecked=!0:this.typechecked=!1},ifMatchPwd(){this.pwd==this.pwdConfirmed?this.pwdMatched=!0:this.pwdMatched=!1},async handleSignup(){try{if(this.typecheck(),this.ifMatchPwd(),0==this.typechecked||0==this.emailvalid||0==this.pwdMatched)throw"validation failed";const t=await n.a.post("http://100.25.219.17/api/user//registration",{username:this.input.email,password:this.input.pwd,firstname:this.input.firstName,lastname:this.input.lastName},{headers:{"Content-type":"application/json"}});if(!0===t.data.isRegistered)return this.regerror=!0,this.isReg=!0,!1;this.regerror=!1,this.$router.push("/signuplink")}catch{return this.regerror=!0,!1}}}},o=l,d=a("2877"),c=Object(d["a"])(o,s,i,!1,null,"b79cbe6e",null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0b9f47.a4125227.js.map