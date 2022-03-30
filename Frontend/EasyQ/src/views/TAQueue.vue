<template>
  <div id="main">
    <span id="left" class="half d-flex flex-column">
        <div class="mt-5 mb-3 ms-5 h4">Number of people in queue: {{qlength}}</div>
        <div class="mt-2 mb-1 ms-5 me-5 h-25 border border-secondary d-flex flex-column overflow-hidden">
            <div class="mt-2 ms-2 fs-5">Current Student: {{sname}}</div>
            <div class="ms-2 fs-6">Email: {{semail}}</div>
            <div class="ms-2 fs-6">Question: {{squestion}}</div>
        </div>
        <button class="cente mt-4 btn btn-warning col-xl-3" @click="next">Next Student</button>
    </span>
    <span id="right" class="half d-flex flex-column">
        <div class="mt-5 mb-3 ms-5 text-white h4">Meeting Information</div>
        <div class="mt-1 mb-1 ms-5 text-white fs-6">Meeting Link</div>
        <input class="ms-5 me-5 higher" v-model="vlink"/>
        <button class="cente mt-4 btn btn-warning col-xl-3" @click="start_end">{{button_val}}</button>
    </span>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted: function () {
    this.setStartButton();
    this.getInfo();
    this.timer = window.setInterval(() => {
      if (this.started==true){
        this.getlength()
      }

    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  data() {
    return {
      button_val: "",
      started: false,
      qlength: "",

      sname: "",
      semail: "",
      squestion: "",

      user_id: getCookie("id"),
      class_id: this.$route.params.courseid,
      vdes: "",
      vlink: "",
      ohid: "",
      ended: "",
      timer: null,
    };
  },
  methods: {
    setStartButton() {
      if (this.started == false) {
            this.button_val = "Start Meeting"
      } else {
            this.button_val = "End Meeting"
      }
      console.log(this.class_id);
    },
    async getInfo() {
        console.log("good1");
        var data = {
          ta_id: this.user_id,
          class_id: this.class_id,
        };
        const response = await axios.post('http://100.25.219.17/api/user/ta/getofficehourid', data,{headers: {'Content-type': 'application/json',}});
        if (response.data.existOH == true) {
          this.ohid = response.data.office_hour_id;
          this.vlink = response.data.meeting_link;
          console.log("good2");
          this.button_val = "End Meeting";
          this.started = true;
        }
    },
    async start_end() {
      if (this.started == false) {
        this.started = true;
        this.setStartButton();

        var data = {
          user_id: this.user_id,
          class_id: this.class_id,
          description: this.vdes,
          meeting_link: this.vlink,
        };
        const response = await axios.post('http://100.25.219.17/api/user/ta/startofficehour', data,{headers: {'Content-type': 'application/json',}});
        this.ohid = response.data.OFFICE_HOUR_ID;
      } else {
        this.started = false;
        this.setStartButton();

        data = {
          user_id: this.user_id,
          office_hour_id: this.ohid,
        };
        const response = await axios.post('http://100.25.219.17/api/user/ta/endofficehour', data,{headers: {'Content-type': 'application/json',}});
        this.ended = response.data.SUCCESSFULLY_ENDED;
      }
    },
    async getlength() {
      var data = {
        user_id: this.user_id,
        office_hour_id: this.ohid,
      };
      const response = await axios.post('http://100.25.219.17/api/user/ta/getqueuelength', data,{headers: {'Content-type': 'application/json',}});
      this.qlength = response.data.QUEUE_LENGTH;
    },
  
    async next() {
      var data = {
        user_id: this.user_id,
        office_hour_id: this.ohid,
      };
      const response = await axios.post('http://100.25.219.17/api/user/ta/popstudent', data,{headers: {'Content-type': 'application/json',}});
      this.sname = response.data.NAME;
      this.semail = response.data.EMAIL_ADDRESS;
      this.squestion = response.data.QUESTION;
      this.getlength();
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
#right {
    margin-left:50%;
    background-color: #3380C8;
}
.half {
    width: 50%;
    height: 100%;
    position: fixed;
}
.higher {
    height: 22%;
}
.cente {
    align-self:center;
}

</style>