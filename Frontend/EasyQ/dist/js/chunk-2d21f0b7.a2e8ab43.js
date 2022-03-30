(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21f0b7"],{d7c1:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container-fluid py-5 h-100"},[s("display2",{staticStyle:{"font-size":"200%"}},[s("strong",[e._v("Course Details")])]),s("div",{staticClass:"card",staticStyle:{width:"70rem",height:"30rem"}},[s("div",{staticClass:"card-body"},[s("form",{on:{submit:function(t){return t.preventDefault(),e.handleEdit.apply(null,arguments)}}},[s("div",{directives:[{name:"show",rawName:"v-show",value:1===e.EditStatus&&0===e.editable,expression:"EditStatus === 1 && editable === 0"}],staticClass:"alert alert-danger"},[s("strong",[e._v(" Class Edit Success ")])]),s("div",{directives:[{name:"show",rawName:"v-show",value:0===e.EditStatus&&0===e.editable,expression:"EditStatus === 0 && editable === 0"}],staticClass:"alert alert-danger"},[s("strong",[e._v(" Class Edit Failed ")])]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"detailclassnum"}},[e._v("Class Number")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.Detailed_Course.CLASS_NUMBER,expression:"Detailed_Course.CLASS_NUMBER"}],staticClass:"form-control",attrs:{type:"classnum",id:"detailclassnum",placeholder:"Class Number",disabled:0==this.editable},domProps:{value:e.Detailed_Course.CLASS_NUMBER},on:{input:function(t){t.target.composing||e.$set(e.Detailed_Course,"CLASS_NUMBER",t.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"detailclassname"}},[e._v("Class Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.Detailed_Course.CLASS_NAME,expression:"Detailed_Course.CLASS_NAME"}],staticClass:"form-control",attrs:{type:"classname",id:"detailclassname",placeholder:"Class Name",disabled:0==this.editable},domProps:{value:e.Detailed_Course.CLASS_NAME},on:{input:function(t){t.target.composing||e.$set(e.Detailed_Course,"CLASS_NAME",t.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"detailclassTERM"}},[e._v("Term")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.Detailed_Course.CLASS_TERM,expression:"Detailed_Course.CLASS_TERM"}],staticClass:"form-control",attrs:{type:"classterm",id:"detailclassterm",placeholder:"Class Term",disabled:0==this.editable},domProps:{value:e.Detailed_Course.CLASS_TERM},on:{input:function(t){t.target.composing||e.$set(e.Detailed_Course,"CLASS_TERM",t.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"detailclassinfo"}},[e._v("Course Desciption")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.Detailed_Course.CLASS_INFO,expression:"Detailed_Course.CLASS_INFO"}],staticClass:"form-control",attrs:{id:"classinfo",rows:"3",disabled:0==e.editable},domProps:{value:e.Detailed_Course.CLASS_INFO},on:{input:function(t){t.target.composing||e.$set(e.Detailed_Course,"CLASS_INFO",t.target.value)}}})]),s("button",{directives:[{name:"show",rawName:"v-show",value:1==e.editable,expression:"editable == 1"}],staticClass:"btn btn-warning mr-2 btn-lg btn-block",attrs:{type:"submit"}},[e._v(" Change")])]),s("a",{directives:[{name:"show",rawName:"v-show",value:0==e.editable,expression:"editable == 0"}],staticClass:"btn btn-primary mr-2 btn-md",staticStyle:{position:"absolute",bottom:"0",left:"0"},on:{click:e.RemoveCourse}},[e._v("Remove Course")]),s("div",{directives:[{name:"show",rawName:"v-show",value:!1===e.RemoveStatus,expression:"RemoveStatus === false"}],staticClass:"alert alert-danger"},[s("strong",[e._v(" Class Removal Failed ")])]),s("button",{directives:[{name:"show",rawName:"v-show",value:0==e.editable,expression:"editable == 0"}],staticClass:"btn btn-warning mr-2 btn-lg ",staticStyle:{position:"absolute",bottom:"0",right:"0"}},[s("router-link",{attrs:{to:"/instructor/CourseDetail/Classlist/"+e.Detailed_Course.CLASS_ID}},[e._v(" Classlist ")])],1),s("a",{directives:[{name:"show",rawName:"v-show",value:0==e.editable,expression:"editable == 0"}],staticClass:"btn btn-primary mr-2 btn-md",staticStyle:{position:"absolute",top:"0",right:"0"},on:{click:function(t){return e.EnableEdit()}}},[e._v("Edit")])])]),s("span",[e._v("Editable: "+e._s(this.editable))]),s("button",{staticClass:"btn btn-warning mr-2 btn-lg btn-block",staticStyle:{position:"absolute",bottom:"0",right:"0"}},[s("router-link",{attrs:{to:"/instructor/main"}},[e._v(" Return ")])],1)],1)},i=[],l=s("bc3a"),o=s.n(l),r={data(){return{editable:0,CourseNum:null,Detailed_Course:null,RemoveStatus:null,EditStatus:0}},methods:{Find_SelectCourse(e){const t=this.$store.getters.instructor_see_Courselist;let s=0;while(s<t.length){if(console.log("Courselist[i].CLASS_NUMBER:"+t[s].CLASS_NUMBER),t[s].CLASS_NUMBER===e)return t[s];s++}},async RemoveCourse(){const e=await o.a.post("http://54.163.38.93/api/user/instructor/removeClass",{class_id:this.Detailed_Course.CLASS_ID},{headers:{"Content-type":"application/json"}});if(!0!==e.data.success)return this.RemoveStatus=!1,!1;this.RemoveStatus=!0,this.$router.push("/instructor/CourseRemove")},EnableEdit(){0===this.editable&&(this.editable=1)},async handleEdit(){const e=await o.a.post("http://54.163.38.93/api/user/instructor/editClass",{CLASS_ID:this.Detailed_Course.CLASS_ID,CLASS_NUMBER:this.Detailed_Course.CLASS_NUMBER,CLASS_NAME:this.Detailed_Course.CLASS_NAME,CLASS_INFO:this.Detailed_Course.CLASS_INFO,CLASS_TERM:this.Detailed_Course.CLASS_TERM},{headers:{"Content-type":"application/json"}});return!0===e.data.success?(this.EditStatus=1,this.editable=0,!0):(this.EditStatus=0,!1)}},created(){this.EditStatus=null,this.RemoveStatus=null,this.CourseNum=this.$route.params.CLASSNAME,this.Detailed_Course=this.Find_SelectCourse(this.CourseNum),console.log("this is detailed course NUMBER: "+this.Detailed_Course.CLASS_NUMBER)}},n=r,d=s("2877"),u=Object(d["a"])(n,a,i,!1,null,"5b7c7606",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d21f0b7.a2e8ab43.js.map