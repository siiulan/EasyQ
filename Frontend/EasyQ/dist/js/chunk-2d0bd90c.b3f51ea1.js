(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd90c"],{"2d15":function(s,t,e){"use strict";e.r(t);var i=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("form",[e("div",{staticClass:"form-group row"},[e("div",{staticClass:"col-sm-10"},[s._v("Class Number: "+s._s(s.classNumber))]),e("div",{staticClass:"col-sm-10"},[s._v("Class Name: "+s._s(s.className))]),e("div",{staticClass:"col-sm-10"},[s._v("TA Name: "+s._s(s.TAName))]),s._m(0),e("div",{staticClass:"col-sm-10"},[s._v("The position of queueing: "+s._s(s.queueIndex))]),e("div",{staticClass:"col-sm-10"},[s._v("Meeting Link: "+s._s(s.meetingLink))]),e("div",{staticClass:"col-sm-10"},[e("button",{staticClass:"btn btn-primary",staticStyle:{"margin-top":"10px","margin-right":"20px"},attrs:{type:"submit"},on:{click:s.startQueue}},[s._v("Queue")]),e("button",{staticClass:"btn btn-primary",staticStyle:{"margin-top":"10px"},attrs:{type:"submit"},on:{click:s.quitQueue}},[s._v("Quit")])])])])])])])},a=[function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"col-sm-10"},[e("label",{staticClass:"form-label",attrs:{for:"exampleFormControlTextarea1"}},[s._v("Question:")]),e("textarea",{staticClass:"form-control",attrs:{id:"exampleFormControlTextarea1",rows:"3"}})])}],o=e("bc3a"),n=e.n(o),u={mounted:function(){this.startQueue(),window.setInterval(()=>{this.getLength()},5e3)},data(){return{isQuit:!1,userId:r("id"),TAName:"",TAId:"",classNumber:"",meetingLink:"",queueIndex:"",className:"",classId:this.$route.params.classId,officehourId:"",startQ:!1,isActive:!1,userQuestion:""}},methods:{async officehourInfo(){var s={classId:this.classId,userId:this.userId,userQuestion:this.userQuestion};const t=await n.a.post("http://54.163.38.93/api/user/student/officehour/display",{data:s},{headers:{"Content-type":"application/json"}});this.className=t.CLASS_NAME,this.classId=t.CLASS_ID,this.classNumber=t.CLASS_NUMBER,this.TAName=t.TA_NAME,this.TAId=t.TA_ID,this.officehourId=t.OFFICE_HOUR_ID},async startQueue(){var s={classId:this.classId,userId:this.userId};const t=await n.a.post("http://54.163.38.93/api/user/student/officehour/join",{data:s},{headers:{"Content-type":"application/json"}});this.startQ=t.isinQueue,this.className=t.CLASS_NAME,this.classId=t.CLASS_ID,this.classNumber=t.CLASS_NUMBER,this.TAName=t.TA_NAME,this.TAId=t.TA_ID,this.officehourId=t.OFFICE_HOUR_ID,this.queueIndex=t.QUEUE_INDEX},async getLength(){var s={classId:this.classId,userId:this.userId,officehourId:this.OFFICE_HOUR_ID};const t=await n.a.post("http://54.163.38.93/api/user/student/officehour/inqueue",{data:s},{headers:{"Content-type":"application/json"}});this.startQ=t.isinQueue,1==this.startQ?(console.log("In the queue"),this.className=t.CLASS_NAME,this.classId=t.CLASS_ID,this.classNumber=t.CLASS_NUMBER,this.TAName=t.TA_NAME,this.TAId=t.TA_ID,this.officehourId=t.OFFICE_HOUR_ID,this.queueIndex=t.QUEUE_INDEX):(console.log("Not in the queue"),this.className=t.CLASS_NAME,this.classNumber=t.CLASS_NUMBER,this.TAName=t.TA_NAME,this.TAId=t.TA_ID,this.officehourId=t.OFFICE_HOUR_ID,this.queueIndex=t.QUEUE_INDEX,this.meetingLink=t.MEETING_LINK)},async quitQueue(){var s={classId:this.classId,userId:this.userId};const t=await n.a.post("http://54.163.38.93/api/user/student/officehour/quit",{data:s},{headers:{"Content-type":"application/json"}});this.isQuit=t.isQuit,1==this.isQuit?(console.log("quit successfully"),alert("Quit successfully")):(console.log("Something wrong"),alert("Something wrong"))}}};function r(s){let t=s+"=",e=decodeURIComponent(document.cookie),i=e.split(";");for(let a=0;a<i.length;a++){let s=i[a];while(" "==s.charAt(0))s=s.substring(1);if(0==s.indexOf(t))return s.substring(t.length,s.length)}return""}var c=u,l=e("2877"),h=Object(l["a"])(c,i,a,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0bd90c.b3f51ea1.js.map