(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-461f80a4"],{b8ff:function(t,s,e){"use strict";e("eae7")},eae7:function(t,s,e){},eb99:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"d-flex flex-column ms-5",attrs:{id:"main"}},[e("div",{staticClass:"ms-5 mb-3 h-25 h3"},[t._v("Course List")]),t._l(t.items,(function(s){return e("li",{key:s.name},[e("router-link",{staticClass:"ms-5 mb-3 h-25 w-75 border shadow-sm d-flex flex-column",attrs:{to:"/TAQueue/"+s.course_id}},[e("div",{staticClass:"ms-2 mt-2 fs-5"},[t._v(t._s(s.name))]),e("div",{staticClass:"ms-2 mb-3 d-flex flex-row fs-6 w-100"},[e("div",{staticClass:"col-xl-3"},[t._v("Instructor: "+t._s(s.instructor))]),e("div",{staticClass:"col-xl-2"},[t._v("Term: "+t._s(s.term))]),e("div",{staticClass:"col-xl-4"},[t._v("Schedule: "+t._s(s.schedule))]),e("div",{staticClass:"col-xl-3"},[e("router-link",{staticClass:"btn editbtn text-white col-xl-10",attrs:{to:"/EditInfo/"+s.course_id}},[t._v("Edit Information")])],1)])])],1)}))],2)},n=[],a=e("bc3a"),l=e.n(a),o={mounted:function(){this.getInfo()},data(){return{user_id:r("id"),items:[]}},methods:{async getInfo(){var t={TA_user_id:this.user_id};const s=await l.a.post("http://54.163.38.93/api/user/ta/getClass",t,{headers:{"Content-type":"application/json"}});this.items=s.data.course_list}}};function r(t){let s=t+"=",e=decodeURIComponent(document.cookie),i=e.split(";");for(let n=0;n<i.length;n++){let t=i[n];while(" "==t.charAt(0))t=t.substring(1);if(0==t.indexOf(s))return t.substring(s.length,t.length)}return""}var c=o,u=(e("b8ff"),e("2877")),d=Object(u["a"])(c,i,n,!1,null,null,null);s["default"]=d.exports}}]);
//# sourceMappingURL=chunk-461f80a4.8f1b3c6a.js.map