(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd90c"],{"2d15":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("button",{staticClass:"btn btn-warning btn-md my-2 btn-block"},[e("router-link",{attrs:{to:"/StudentHome"}},[t._v("Return")])],1),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.startQueue.apply(null,arguments)}}},[e("div",{staticClass:"form-group row"},[e("div",{staticClass:"col-sm-10"},[t._v("Class Number: "+t._s(t.classNumber))]),e("div",{staticClass:"col-sm-10"},[t._v("Class Name: "+t._s(t.className))]),e("div",{staticClass:"col-sm-10"},[t._v("TA Name: "+t._s(t.TAName))]),e("div",{staticClass:"col-sm-10"},[e("label",{staticClass:"form-label",attrs:{for:"exampleFormControlTextarea1"}},[t._v("Question:")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.userQuestion,expression:"userQuestion"}],staticClass:"form-control",attrs:{id:"exampleFormControlTextarea1",rows:"3"},domProps:{value:t.userQuestion},on:{input:function(s){s.target.composing||(t.userQuestion=s.target.value)}}})]),e("div",{staticClass:"col-sm-10"},[t._v("The position of queueing: "+t._s(t.queueIndex))]),e("div",{staticClass:"col-sm-10"},[t._v("Meeting Link: "+t._s(t.meetingLink))]),e("div",{staticClass:"col-sm-10"},[t.isQueue?e("button",{staticClass:"btn btn-warning btn-md my-2 btn-block",staticStyle:{"margin-top":"10px","margin-right":"20px"},attrs:{type:"submit"}},[t._v("Queue")]):t._e(),e("button",{staticClass:"btn btn-warning btn-md my-2 btn-block",staticStyle:{"margin-top":"10px"},attrs:{type:"quit"},on:{click:t.quitQueue}},[e("router-link",{attrs:{to:"/StudentHome"}},[t._v("Quit")])],1)])])])])])])},i=[],o=e("bc3a"),u=e.n(o),n={mounted:function(){this.timer=setInterval(()=>{this.officehourInfo()},1e3)},beforeDestroy(){clearInterval(this.timer),this.timer=null},destroyed(){clearInterval(this.timer),this.timer=null},data(){return{isQuit:!1,userId:r("id"),TAName:"",TAId:"",classNumber:"",meetingLink:"",queueIndex:"",className:"",classId:this.$route.params.classId,officehourId:"",startQ:"",isActive:!1,userQuestion:"",isQueue:!0,timer:null,alreadyinqueue:!1,alreadyotherqueue:!1}},methods:{async officehourInfo(){var t={classId:this.classId,userId:this.userId};const s=await u.a.post("http://100.25.219.17/api/user/student/officehour/display",t,{headers:{"Content-type":"application/json"}});console.log("get class info",s.data),console.log("post data",t),this.startQ=s.data.isinQueue,this.isActive=s.data.isActive,1==this.isActive&&0==this.startQ?(this.className=s.data.CLASS_NAME,this.classId=s.data.CLASS_ID,this.classNumber=s.data.CLASS_NUMBER,this.TAName=s.data.TA_NAME,this.TAId=s.data.TA_ID,this.officehourId=s.data.OFFICE_HOUR_ID):1==this.isActive&&1==this.startQ?(this.className=s.data.CLASS_NAME,this.classId=s.data.CLASS_ID,this.classNumber=s.data.CLASS_NUMBER,this.TAName=s.data.TA_NAME,this.TAId=s.data.TA_ID,this.officehourId=s.data.OFFICE_HOUR_ID,this.queueIndex=s.data.QUEUE_INDEX,this.meetingLink=s.data.MEETING_LINK):(this.className=s.data.CLASS_NAME,this.classId=s.data.CLASS_ID,this.classNumber=s.data.CLASS_NUMBER,alert("There’s no office hour now"))},async startQueue(){var t={classId:this.classId,userId:this.userId,userQuestion:this.userQuestion};const s=await u.a.post("http://100.25.219.17/api/user/student/officehour/join",t,{headers:{"Content-type":"application/json"}});console.log("office_hour_join",s.data),this.startQ=s.data.isinQueue,this.className=s.data.CLASS_NAME,this.classId=s.data.CLASS_ID,this.classNumber=s.data.CLASS_NUMBER,this.TAName=s.data.TA_NAME,this.TAId=s.data.TA_ID,this.officehourId=s.data.OFFICE_HOUR_ID,this.queueIndex=s.data.QUEUE_INDEX,this.isQueue=!1,this.alreadyinqueue=s.data.AlreadyInThisQueue,this.alreadyotherqueue=s.data.AlreadyInOtherQueue,1==this.alreadyinqueue&&alert("You have already been in the queue. "),1==this.alreadyotherqueue&&alert("You have already been in other queue.")},async quitQueue(){var t={classId:this.classId,userId:this.userId,officehourId:this.officehourId};const s=await u.a.post("http://100.25.219.17/api/user/student/officehour/quit",t,{headers:{"Content-type":"application/json"}});console.log("quit info",s.data),this.isQuit=s.data.isQuit,this.isQueue=!0,1==this.isQuit||0==this.isActive?(console.log("quit successfully"),alert("Quit successfully")):(console.log("Something wrong"),alert("Something wrong"))}}};function r(t){let s=t+"=",e=decodeURIComponent(document.cookie),a=e.split(";");for(let i=0;i<a.length;i++){let t=a[i];while(" "==t.charAt(0))t=t.substring(1);if(0==t.indexOf(s))return t.substring(s.length,t.length)}return""}var l=n,d=e("2877"),c=Object(d["a"])(l,a,i,!1,null,null,null);s["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0bd90c.de07eba8.js.map