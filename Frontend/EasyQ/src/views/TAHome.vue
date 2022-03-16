<template>
  <div id="main" class="d-flex flex-column ms-5">
    <div class="ms-5 mb-3 h-25 h3">Course List</div>
    <li v-for="item in items" :key="item.name">
        <router-link :to="'/TAQueue/' + item.course_id" class="ms-5 mb-3 h-25 w-75 border shadow-sm d-flex flex-column">
            <div class="ms-2 mt-2 fs-5">{{ item.name }}</div>
            <div class="ms-2 mb-3 d-flex flex-row fs-6 w-100">
                <div class="col-xl-3">Instructor: {{item.instructor}}</div>
                <div class="col-xl-2">Term: {{item.term}}</div>
                <div class="col-xl-4">Schedule: {{item.schedule}}</div>
                <div class="col-xl-3">
                <router-link :to="'/EditInfo/' + item.course_id" class="btn editbtn text-white col-xl-10">Edit Information</router-link>
                </div>
            </div>
        </router-link>
    </li>
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
        user_id: getCookie("id"),
        items: []
  
    };
  },
  methods: {
    async getInfo() {

      var data = {
        TA_user_id: this.user_id,
      };
      const response = await axios.post('http://54.163.38.93/api/user/ta/getClass', data,{headers: {'Content-type': 'application/json',}});
      this.items = response.data.course_list;
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
li
{
    list-style-type:none;
}
.editbtn {
    background-color: #3380C8;
}
a {
    color: #000000;
}

</style>