(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-503dda73"],{"88ae":function(s,t,a){},"97eb":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"event-single"},[a("section",{staticClass:"hero is-primary"},[a("div",{staticClass:"hero-body"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[s._v("Class Number: "+s._s(s.classNumber))]),a("h2",{staticClass:"subtitle "},[s._v("Class Name: "+s._s(s.className))])])])]),a("section",{staticClass:"event-content"},[a("div",{staticClass:"container"},[a("p",{staticClass:"is-size-4 description"},[s._v("Detailed info:")]),a("p",{staticClass:"is-size-4"},[s._v("instructor name: "+s._s(s.instructorName))]),a("p",{staticClass:"is-size-4"},[s._v("TA Name: "+s._s(s.TAName))])])])])},i=[],c=a("bc3a"),n=a.n(c),l={mounted:function(){this.getClassInfo()},data(){return{className:"",classNumber:"",classId:this.$route.params.classId,TAName:"",instructorName:""}},methods:{async getClassInfo(){var s={classId:this.classId};console.log(this.classId);const t=await n.a.post("http://54.163.38.93/api/user/student/classes/class",s,{headers:{"Content-type":"application/json"}});console.log(t.data),this.className=t.data.CLASS_NAME,this.classNumber=t.data.CLASS_NUMBER;for(let a=0;a<t.data.TA_NAME.length;a++)this.TAName+=t.data.TA_NAME[a]+" ";this.instructorName=t.data.INSTRUCTOR_NAME,this.classId=t.data.CLASS_ID}}},o=l,r=(a("cccb"),a("2877")),d=Object(r["a"])(o,e,i,!1,null,"0004f38e",null);t["default"]=d.exports},cccb:function(s,t,a){"use strict";a("88ae")}}]);
//# sourceMappingURL=chunk-503dda73.b236eb33.js.map