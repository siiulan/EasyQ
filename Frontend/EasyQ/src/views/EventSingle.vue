<template>
  <div class="event-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Class Number: {{classNumber}}</h1>
          <h2 class="subtitle ">Class Name: {{className}}</h2>
        </div>
      </div>
    </section>
    <section class="event-content">
      <div class="container">
        <p class="is-size-4 description">Detailed info:</p>
        <p class="is-size-4">instructor name: {{instructorName}}</p>
        <p class="is-size-4">TA Name: {{TAName}}</p>
        <!-- <div class="event-images columns is-multiline has-text-centered">
          <div class="column is-one-third">IMAGE PLACEHOLDER</div>
        </div> -->
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';

  export default {
      mounted: function () {
        this.getClassInfo();
    },
      data() {
          return{
              className: '',
              classNumber: '',
              classId: this.$route.params.classId,
              TAName: '',
              instructorName: ''
          }
      },
      methods:{
        async getClassInfo() {
        var data = {
          classId : this.classId,
        }
        console.log(this.classId)
        const response = await axios.post('http://100.25.219.17/api/user/student/classes/class',data,{headers: {'Content-type' : 'application/json',}});
        
        console.log(response.data);
        this.className = response.data.CLASS_NAME;
        // this.classId = response.data.CLASS_ID;
        this.classNumber = response.data.CLASS_NUMBER;
        for(let i = 0;i < response.data.TA_NAME.length;i++)
        {
            this.TAName += response.data.TA_NAME[i]+ " ";
        }
        // this.TAName = response.data.TA_NAME;
        this.instructorName = response.data.INSTRUCTOR_NAME;
        this.classId = response.data.CLASS_ID
      }
      }
      
      
    // CLASS_ID 
    // CLASS_NUMBER 
    // CLASS_NAME 
    // CLASS_INFO 
    // CLASS_TERM 
    // INSTRUCTOR_NAME 
    // TA_NAME //all the TA’s name, not just one

  };
</script>
<style lang="scss" scoped>
  .event-single {
    margin-top: 20px;
  }
  .hero {
    margin-bottom: 70px;
  }
  // .event-images {
  //   margin-top: 50px;
  // }
  .description {
    margin-bottom: 30px;
  }
</style>