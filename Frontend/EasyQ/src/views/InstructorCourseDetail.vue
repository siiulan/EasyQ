<template>
<div class="container-fluid py-5 h-100">
    <display2>Course Details</display2>
    <div class="card" style="width: 50rem;height: 20rem">
        <div class="card-body">
        <h5>CLASS NUMBER: {{Detailed_Course.CLASS_NUMBER}} </h5>
        <h5>CLASS NAME: {{Detailed_Course.CLASS_NAME}}</h5>
        <h5>TERM: {{Detailed_Course.CLASS_TERM}}</h5>
        <p>CLASS DESCRIPTION: {{Detailed_Course.CLASS_INFO}}</p>
        <a  class="btn btn-primary" @click="RemoveCourse">Remove</a>
        <div class="alert alert-danger" v-show="RemoveStatus === false">
             <strong> Class Removal Failed </strong>
        </div>
        <!--<a href="#" class="btn btn-primary align-bottom">Edit</a> -->
    </div>
  </div>
  <button class="btn btn-warning mr-2 btn-lg btn-block" style ="position: absolute; bottom: 0;right:0;" > 
             <router-link to='/instructor/main'>  Return   </router-link>
  </button>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
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
            Memberlist : [
                {
 
      "FIRST_NME": "test",
      "LAST_NME": "student",
      "USER_ID": "1",
      "USER_ROLE": "student"
    },
    {
 
      "FIRST_NME": "test",
      "LAST_NME": "TA",
      "USER_ID": "4",
      "USER_ROLE": "TA"
    }


            ],
            CourseNum : null,
            Detailed_Course : null,
            RemoveStatus : null
        };
    },
    methods:{
        Find_SelectCourse(given_CourseNum){
            //const Courselist = this.$store.getters.instructor_see_Courselist;
            //console.log("courselist length: " + Courselist.length)
            console.log("courselist  " + this.Courselist);
            let i = 0;
            while(i< this.Courselist.length){
                if(this.Courselist[i].CLASS_NUMBER === given_CourseNum){
                    return this.Courselist[i];
                }
                else{
                    i++;
                }
            }
            /*for (let Course in this.Courselist){
                if (Course['CLASS_NUMBER'] === given_CourseNum){
                    this.Detailed_Course.push(Course);  
                }
            }*/
            /*
            if(given_CourseNum === ""){
                return this.Courselist[1];
            }
            return this.Courselist[0];*/
            //const SelectCourse = this.Courselist.find((Course) => Course.CLASS_NUMBER === given_CourseNum );
        },
        async RemoveCourse(){
            const response = await axios.post('http://localhost:8080/api/user/instructor/removeClass',{
                class_id : this.Detailed_Course.CLASS_ID
                },{headers: {'Content-type': 'application/json',}});
            if(response.data.success === true){
                this.RemoveStatus = true;
                this.$router.push('/instructor/CourseRemove');
            }
            else{
                this.RemoveStatus = false;
            }
            

        },
        async GetStudent(){
            /*
            const res = await axios.get('http://localhost:8080/api/user/instructor/getClassMembers',
                    {params: {
                        class_id : this.Detailed_Course.CLASS_ID
                    }});
                    console.log(res.data);
                    //this.Memberlist = res.data;*/
        }
    },
    created(){
        this.CourseNum = this.$route.params.CLASSNAME;
        this.Detailed_Course = this.Find_SelectCourse(this.CourseNum);
        console.log("this is detailed course: " +  this.Detailed_Course);
    }
};
</script>

<style scoped>

</style>
