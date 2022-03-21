<template>
<div class="container-fluid py-5 h-100">
<ul>
  <li class="card" py-5 v-for="Course in Courselist" :key="Course">
      <div class="card-body">
    <h5 class="card-title"> Course Number :  {{Course.CLASS_NUMBER}}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Course Name : {{Course.CLASS_NAME}} </h6>
    <h6 class="card-subtitle mb-2 text-muted">Term : {{Course.CLASS_TERM}} </h6>
    <h6 class="card-subtitle mb-2 text-muted">Instructor : {{Course.INSTRUCTOR_ID}} </h6>
    <p class="card-text"> Description : {{Course.CLASS_INFO}}</p>
    <button class="btn btn-warning btn-md my-2 btn-block" > 
        <router-link :to="'/instructor/CourseDetail/' + Course.CLASS_NUMBER ">Detail</router-link>
    </button>
  </div>
 </li>
</ul>
<button class="btn btn-warning btn-md my-2 btn-block" > 
        <router-link to='/instructor/addClass'>Add a Class</router-link>
</button>
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
                {
                    "CLASS_ID": "1",
                    "CLASS_NUMBER": "YES100",
                    "CLASS_NAME": "Yes or Yes",
                    "CLASS_INFO": "yesmora",
                    "CLASS_TERM": "Winter 2022",
                    "INSTRUCTOR_ID": "0"

                },
                {
                    "CLASS_ID": "2",
                    "CLASS_NUMBER": "YES101",
                    "CLASS_NAME": "Yes or Yes or yes",
                    "CLASS_INFO": "yesmoramora",
                    "CLASS_TERM": "Winter 2022",
                    "INSTRUCTOR_ID": "0"
                }
                ],
                user_ID : 0,
            }
        },
        methods:{
            async getClasslist(){
                try { 
                    const res = await axios.get('http://54.163.38.93/api/user/instructor/getClass',
                    {params: {
                        user_ID : this.user_ID
                    }})
                    console.log(res.data);
                    //this.Courselist = res.data;

                }
               catch (error) { console.log(error) }
           },
           async GetDetail(ClassName,ClassNum){
               try{
               const res = await axios.get('http://54.163.38.93/api/user/instructor/getClass',
                    {params: {
                        user_ID : this.user_ID,
                        class_name : ClassName,
                        class_number : ClassNum
                    }})
                    console.log(res.data)
               }
               catch (error) {console.log(error)}
           }
        },
        created(){
            //this.GetClasslist();
            this.$store.dispatch('instructor_SetCourselist',this.Courselist);
        }
 }

</script>

<style></style>