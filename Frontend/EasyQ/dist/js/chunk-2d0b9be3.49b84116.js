(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9be3"],{"33f3":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container py-5 h-100"},[e("div",{staticClass:"row d-flex align-items-center justify-content-center h-100"},[e("div",{directives:[{name:"show",rawName:"v-show",value:!1===t.addStatus,expression:"addStatus === false "}],staticClass:"alert alert-danger"},[e("strong",[t._v(" Add TA Failed ")])]),e("form",{on:{submit:function(s){return s.preventDefault(),t.AddTA.apply(null,arguments)}}},[e("div",{directives:[{name:"show",rawName:"v-show",value:1===t.TAexist,expression:"TAexist === 1"}],staticClass:"alert alert-warning",attrs:{role:"alert"}},[t._v(" This account has already been registered as TA in this course. ")]),e("div",{staticClass:"form-outline mb-4"},[t._m(0),e("input",{directives:[{name:"model",rawName:"v-model",value:t.input.Email,expression:"input.Email"}],staticClass:"form-control form-control-lg",attrs:{type:"text",id:"emailaddr",required:"required"},domProps:{value:t.input.Email},on:{input:function(s){s.target.composing||t.$set(t.input,"Email",s.target.value)}}})]),t._m(1)])])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("label",{staticClass:"form-label",staticStyle:{"font-size":"20px"},attrs:{for:"emailaddr"}},[e("strong",[t._v(" Email Address ")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"col-xs-3"},[e("button",{staticClass:"btn btn-warning mr-2 btn-lg btn-block",attrs:{type:"submit"}},[t._v(" Add as TA ")])])}],r=e("bc3a"),n=e.n(r),l={data(){return{input:{Email:null},CourseID:null,addStatus:null,TAexist:null}},methods:{async AddTA(){try{console.log("course id: "+this.CourseID),console.log("email: "+this.input.Email);const t=await n.a.post("http://100.25.219.17/api/user/instructor/classAddTA",{email_adress:this.input.Email,class_id:this.CourseID},{headers:{"Content-type":"application/json"}});if(console.log("success: "+t.data.success),console.log("exist: "+t.data.exist),!0===t.data.success&&!0===t.data.exist)this.TAexist=0,this.addStatus=!0,this.$router.push("/instructor/addTASuccess");else if(!1===t.data.success&&!0===t.data.exist)this.TAexist=1;else{if(!0!==t.data.success||!1!==t.data.exist)throw this.addStatus=!1,"add TA failed";this.TAexist=0,this.addStatus=!0,this.$router.push("/instructor/addTAVerification")}}catch{return!1}}},created(){this.CourseID=this.$route.params.CLASSID}},o=l,d=e("2877"),u=Object(d["a"])(o,a,i,!1,null,"dad054ba",null);s["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0b9be3.49b84116.js.map