(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0daee3"],{"6e64":function(t,s,e){"use strict";e.r(s);var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"add class info"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.add.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col",staticStyle:{"margin-left":"70px","margin-top":"30px"}},[e("label",{attrs:{for:"exampleFormControlInput1"}},[t._v("Class Number")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.input.classNumber,expression:"input.classNumber"}],staticClass:"form-control",attrs:{type:"text",id:"exampleFormControlInput1"},domProps:{value:t.input.classNumber},on:{input:function(s){s.target.composing||t.$set(t.input,"classNumber",s.target.value)}}}),e("label",{staticStyle:{"margin-top":"30px"},attrs:{for:"exampleFormControlInput1"}},[t._v("Invitation code")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.input.invitationCode,expression:"input.invitationCode"}],staticClass:"form-control",attrs:{type:"text",id:"exampleFormControlInput1"},domProps:{value:t.input.invitationCode},on:{input:function(s){s.target.composing||t.$set(t.input,"invitationCode",s.target.value)}}})])]),e("button",{staticClass:"btn btn-warning btn-md my-2 btn-block",staticStyle:{"margin-left":"70px","margin-top":"30px"},attrs:{type:"submit"},on:{click:t.add}},[t._v("Submit")]),e("button",{staticClass:"btn btn-warning btn-md my-2 btn-block",staticStyle:{"margin-left":"10px"}},[e("router-link",{attrs:{to:"/StudentHome"}},[t._v("Return")])],1)]),t.isSuccess?e("div",{staticClass:"alert alert-success",staticStyle:{"margin-top":"20px"}},[t._v("Successfully added!")]):t._e()])},a=[],i=e("bc3a"),o=e.n(i),l={data(){return{input:{classNumber:"",className:"",invitationCode:""},isSuccess:!1,userId:r("id"),couseId:this.$route.params.CLASS_ID}},methods:{async add(){try{console.log(this.userId);const t=await o.a.post("http://100.25.219.17/api/user/student/addclass",{userId:this.userId,classNumber:this.input.classNumber,invitationCode:this.input.invitationCode},{headers:{"Content-type":"application/json"}});console.log(t.data),0==t.data.isclassexisted?(console.log("Class not exists!"),alert("Class not exists!"),this.isSuccess=!1):1==t.data.isEnrolled?(console.log("You has been enrolled in this class"),alert("Enrolled successfully!"),this.isSuccess=!1):0==t.data.isCodeRight?(console.log("Wrong code"),alert("Wrong code!"),this.isSuccess=!1):this.isSuccess=!0}catch(t){return console.log(t),alert("Wrong request"),this.isSuccess=!1,!1}}}};function r(t){let s=t+"=",e=decodeURIComponent(document.cookie),n=e.split(";");for(let a=0;a<n.length;a++){let t=n[a];while(" "==t.charAt(0))t=t.substring(1);if(0==t.indexOf(s))return t.substring(s.length,t.length)}return""}var c=l,u=e("2877"),d=Object(u["a"])(c,n,a,!1,null,null,null);s["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0daee3.5ef34be0.js.map