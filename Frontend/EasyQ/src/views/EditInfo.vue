<template>
  <div id="main" class="d-flex flex-column">
    <div class="cente d-flex flex-column">
        <div class="mb-3 h-25 h3">Edit Course Information</div>
        <div class="h-25 h5">{{name}}</div>
        <div class="mt-3 w-100 d-flex flex-row">
            <div class="mt-1 col-xl-3" >Instructor:</div>
            <div class="ms-1 mt-1 w-100">{{instructor}}</div>
        </div>
        <div class="mt-3 w-100 d-flex flex-row">
            <div class="mt-1 col-xl-3" >Term:</div>
            <div class="ms-1 mt-1 w-100">{{term}}</div>
        </div>
        <div class="mt-3 w-100 d-flex flex-row">
            <div class="mt-1 col-xl-3" >Schedule</div>
            <input class="ms-1 mt-0 w-100" v-model="schedule"/>
        </div>
        <button class="cente mt-4 btn btn-warning col-xl-3" @click="save">Save</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted: function () {
    this.getInfo();
  },
  data() {
    return {
        course_id: this.$route.params.courseid,
        user_id: getCookie("id"),
        name: '', 
        instructor: '', 
        term: '', 
        schedule: '',
        successfully_edited: '',
    };
  },
  methods: {
    async save() {
      var data = {
        course_id: this.course_id,
        TA_user_id: this.user_id,
        schedule: this.schedule,
      };
      const response = await axios.post('http://100.25.219.17/api/user/ta/editClass', data,{headers: {'Content-type': 'application/json',}});
      this.successfully_edited = response.data.SuccessfullyEdited;
    },
    async getInfo() {
      var data = {
        course_id: this.course_id,
      };
      const response = await axios.post('http://100.25.219.17/api/user/ta/getsingleClass', data,{headers: {'Content-type': 'application/json',}});
      this.name = response.data.CLASS_NAME;
      this.instructor = response.data.INSTRUCTOR_NAME;
      this.term = response.data.CLASS_TERM;
      this.schedule = response.data.CLASS_INFO;
    },
  },
};
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
</script>
<style>
#main {
    width: 100%;
    height: 100%;
    position: fixed;
}
.cente {
    align-self:center;
}
</style>