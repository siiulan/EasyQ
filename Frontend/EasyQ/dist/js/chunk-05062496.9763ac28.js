(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05062496"],{1742:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"main"}},[e("span",{staticClass:"half d-flex flex-column",attrs:{id:"left"}},[e("div",{staticClass:"mt-5 mb-3 ms-5 h4"},[t._v("Number of people in queue: "+t._s(t.qlength))]),e("div",{staticClass:"mt-2 mb-1 ms-5 me-5 h-25 border border-secondary d-flex flex-column overflow-hidden"},[e("div",{staticClass:"mt-2 ms-2 fs-5"},[t._v("Current Student: "+t._s(t.sname))]),e("div",{staticClass:"ms-2 fs-6"},[t._v("Email: "+t._s(t.semail))]),e("div",{staticClass:"ms-2 fs-6"},[t._v("Question: "+t._s(t.squestion))])]),e("button",{staticClass:"cente mt-4 btn btn-warning col-xl-3",on:{click:t.next}},[t._v("Next Student")])]),e("span",{staticClass:"half d-flex flex-column",attrs:{id:"right"}},[e("div",{staticClass:"mt-5 mb-3 ms-5 text-white h4"},[t._v("Meeting Information")]),e("div",{staticClass:"mt-1 mb-1 ms-5 text-white fs-6"},[t._v("Meeting Description")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.vdes,expression:"vdes"}],staticClass:"ms-5 me-5 higher",domProps:{value:t.vdes},on:{input:function(s){s.target.composing||(t.vdes=s.target.value)}}}),e("div",{staticClass:"mt-1 mb-1 ms-5 text-white fs-6"},[t._v("Meeting Link")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.vlink,expression:"vlink"}],staticClass:"ms-5 me-5",domProps:{value:t.vlink},on:{input:function(s){s.target.composing||(t.vlink=s.target.value)}}}),e("button",{staticClass:"cente mt-4 btn btn-warning col-xl-3",on:{click:t.start_end}},[t._v(t._s(t.button_val))])])])},n=[],a=e("bc3a"),o=e.n(a),d={mounted:function(){this.setStartButton(),window.setInterval(()=>{this.getlength()},5e3)},data(){return{button_val:"",started:!1,qlength:"",sname:"",semail:"",squestion:"",user_id:l("id"),class_id:this.$route.params.courseid,vdes:"",vlink:"",ohid:"",ended:""}},methods:{setStartButton(){0==this.started?this.button_val="Start Meeting":this.button_val="End Meeting",console.log(this.class_id)},async start_end(){if(0==this.started){this.started=!0,this.setStartButton();var t={user_id:this.user_id,class_id:this.class_id,description:this.vdes,meeting_link:this.vlink};const s=await o.a.post("http://54.163.38.93/api/user/ta/startofficehour",t,{headers:{"Content-type":"application/json"}});this.ohid=s.data.OFFICE_HOUR_ID}else{this.started=!1,this.setStartButton(),t={user_id:this.user_id,office_hour_id:this.ohid};const s=await o.a.post("http://54.163.38.93/api/user/ta/endofficehour",t,{headers:{"Content-type":"application/json"}});this.ended=s.data.SUCCESSFULLY_ENDED}},async getlength(){var t={user_id:this.user_id,office_hour_id:this.ohid};const s=await o.a.post("http://54.163.38.93/api/user/ta/getqueuelength",t,{headers:{"Content-type":"application/json"}});this.qlength=s.data.QUEUE_LENGTH},async next(){var t={user_id:this.user_id,office_hour_id:this.ohid};const s=await o.a.post("http://54.163.38.93/api/user/ta/popstudent",t,{headers:{"Content-type":"application/json"}});this.sname=s.data.NAME,this.semail=s.data.EMAIL_ADDRESS,this.squestion=s.data.Question,this.getlength()}}};function l(t){let s=t+"=",e=decodeURIComponent(document.cookie),i=e.split(";");for(let n=0;n<i.length;n++){let t=i[n];while(" "==t.charAt(0))t=t.substring(1);if(0==t.indexOf(s))return t.substring(s.length,t.length)}return""}var r=d,u=(e("67e8"),e("2877")),c=Object(u["a"])(r,i,n,!1,null,null,null);s["default"]=c.exports},"67e8":function(t,s,e){"use strict";e("c5e8")},c5e8:function(t,s,e){}}]);
//# sourceMappingURL=chunk-05062496.9763ac28.js.map