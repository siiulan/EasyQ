<template>
<div class="container-fluid py-5 h-100">
<ul>
  <li class="card" py-5 v-for="Course in Courselist" :key="Course">
      <div class="card-body">
    <h5 class="card-title" style="font-size:130%"> Course Number :  {{Course.CLASS_NUMBER}}</h5>
    <h6 class="card-subtitle mb-2 text-muted" style="font-size:130%">Course Name : {{Course.CLASS_NAME}} </h6>
    <h6 class="card-subtitle mb-2 text-muted" style="font-size:130%">Term : {{Course.CLASS_TERM}} </h6>
    <h6 class="card-subtitle mb-2 text-muted" style="font-size:130%">Instructor : {{Name}} </h6>
    <p class="card-text" style="font-size:130%"> Description : {{Course.CLASS_INFO}}</p>
    <button class="btn btn-warning btn-md my-2 btn-block" > 
        <router-link :to="'/instructor/CourseDetail/' + Course.CLASS_NUMBER ">Detail</router-link>
    </button>
  </div>
 </li>
 <button class="btn btn-warning btn-lg my-2 btn-block" style="float: right;" > 
        <router-link to='/instructor/addClass'>Add a Class</router-link>
</button>
</ul>
<!-- 
<select v-model="selected">
  <option v-for="Course in Courselist" :key="Course" v-bind:value="Course.CLASS_NUMBER">
    {{ Course.CLASS_NAME }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
<button type="button" class="btn btn-warning">Remove a Class </button>
<router-link to = "/instructors/editClass" > Edit A Class </router-link>
<router-link to = "/instructors/addClass" > Add A Class </router-link>
-->
</div>
</template>

<script>
import axios from 'axios'
 export default {
        data() {
            return {
                Courselist: [
                ],
                user_ID : "",
                Name : this.$store.getters.Get_Name,
            }
        },
        methods:{
            async getClasslist(){
                try { 
                    const res = await axios.post('http://100.25.219.17/api/user/instructor/getClass',
                    {
                        user_ID : this.user_ID
                    },{headers: {'Content-type': 'application/json',}});
                    const backcourselist = res.data.courseList;
                    console.log("I have got the classlist" + backcourselist.length );
                    this.Courselist = res.data.courseList;
                    this.$store.dispatch('instructor_SetCourselist',this.Courselist);
                    const Clist = this.$store.getters.instructor_see_Courselist;
                    console.log("clist length: " + Clist.length);
                }
               catch (error) { console.log(error) }
           }
        },
        created(){
            this.user_ID = this.$store.getters.Get_User_Id;
            console.log("my user_id:" + this.$store.getters.Get_User_Id);
            this.getClasslist();
        }
 }

</script>

<style scoped></style>