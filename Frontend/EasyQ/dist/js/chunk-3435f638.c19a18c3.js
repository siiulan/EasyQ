(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3435f638"],{"3b08":function(t,s,e){"use strict";e("5673")},5673:function(t,s,e){},"5d84":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"d-flex flex-column",attrs:{id:"main"}},[e("div",{staticClass:"cente d-flex flex-column"},[e("div",{staticClass:"mb-3 h-25 h3"},[t._v("Edit Course Information")]),e("div",{staticClass:"h-25 h5"},[t._v(t._s(t.name))]),e("div",{staticClass:"mt-3 w-100 d-flex flex-row"},[e("div",{staticClass:"mt-1 col-xl-3"},[t._v("Instructor:")]),e("div",{staticClass:"ms-1 mt-1 w-100"},[t._v(t._s(t.instructor))])]),e("div",{staticClass:"mt-3 w-100 d-flex flex-row"},[e("div",{staticClass:"mt-1 col-xl-3"},[t._v("Term:")]),e("div",{staticClass:"ms-1 mt-1 w-100"},[t._v(t._s(t.term))])]),e("div",{staticClass:"mt-3 w-100 d-flex flex-row"},[e("div",{staticClass:"mt-1 col-xl-3"},[t._v("Schedule")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.schedule,expression:"schedule"}],staticClass:"ms-1 mt-0 w-100",domProps:{value:t.schedule},on:{input:function(s){s.target.composing||(t.schedule=s.target.value)}}})]),e("button",{staticClass:"cente mt-4 btn btn-warning col-xl-3",on:{click:t.save}},[t._v("Save")])])])},a=[],n=e("bc3a"),c=e.n(n),l={mounted:function(){this.getInfo()},data(){return{course_id:this.$route.params.courseid,user_id:d("id"),name:"",instructor:"",term:"",schedule:"",successfully_edited:""}},methods:{async save(){var t={course_id:this.course_id,TA_user_id:this.user_id,schedule:this.schedule};const s=await c.a.post("http://54.163.38.93/api/user/ta/editClass",t,{headers:{"Content-type":"application/json"}});this.successfully_edited=s.data.SuccessfullyEdited},async getInfo(){var t={course_id:this.course_id};const s=await c.a.post("http://54.163.38.93/api/user/ta/getsingleClass",t,{headers:{"Content-type":"application/json"}});this.name=s.data.CLASS_NAME,this.instructor=s.data.INSTRUCTOR_ID,this.term=s.data.CLASS_TERM,this.schedule=s.data.CLASS_INFO}}};function d(t){let s=t+"=",e=decodeURIComponent(document.cookie),i=e.split(";");for(let a=0;a<i.length;a++){let t=i[a];while(" "==t.charAt(0))t=t.substring(1);if(0==t.indexOf(s))return t.substring(s.length,t.length)}return""}var o=l,u=(e("3b08"),e("2877")),r=Object(u["a"])(o,i,a,!1,null,null,null);s["default"]=r.exports}}]);
//# sourceMappingURL=chunk-3435f638.c19a18c3.js.map