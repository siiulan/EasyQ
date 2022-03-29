<template>
<div class="container-fluid py-5 h-100">
    <display2 style="font-size:200%"><strong>Course Details</strong></display2>
    <div class="card" style="width: 70rem;height: 30rem">

       <div class="card-body">
        <form @submit.prevent=" handleEdit">
            <div class="alert alert-danger" v-show="EditStatus === 1 && editable === 0">
             <strong> Class Edit Success </strong>
            </div>
            <div class="alert alert-danger" v-show="EditStatus === 0 && editable === 0">
             <strong> Class Edit Failed </strong>
            </div>
           <div class="form-group">
            <label for="detailclassnum">Class Number</label>
            <input type="classnum" class="form-control" id="detailclassnum" v-model="Detailed_Course.CLASS_NUMBER" placeholder="Class Number"  :disabled="this.editable == 0">  
           </div>
           <div class="form-group">
            <label for="detailclassname">Class Name</label>
            <input type="classname" class="form-control" id="detailclassname" v-model="Detailed_Course.CLASS_NAME" placeholder="Class Name"  :disabled="this.editable == 0">  
           </div>
           <div class="form-group">
            <label for="detailclassTERM">Term</label>
            <input type="classterm" class="form-control" id="detailclassterm" v-model="Detailed_Course.CLASS_TERM" placeholder="Class Term"  :disabled="this.editable == 0">  
           </div>
           <div class="form-group">
            <label for="detailclassinfo">Course Desciption</label>
            <textarea class="form-control" id="classinfo" v-model="Detailed_Course.CLASS_INFO" rows="3"  :disabled="editable == 0"></textarea>
            </div>
            <button type="submit" class="btn btn-warning mr-2 btn-lg btn-block" v-show="editable == 1"> Change</button>
        </form>
        <a  class="btn btn-primary mr-2 btn-md" @click="RemoveCourse" v-show="editable == 0" style ="position: absolute; bottom: 0;left:0;">Remove Course</a>
        <div class="alert alert-danger" v-show="RemoveStatus === false">
             <strong> Class Removal Failed </strong>
        </div>
        <!--<a href="#" class="btn btn-primary align-bottom">Edit</a> -->
        <button class="btn btn-warning mr-2 btn-lg " v-show="editable == 0" style ="position: absolute; bottom: 0;right:0;" > 
             <router-link :to="'/instructor/CourseDetail/' + 'Classlist/' +  Detailed_Course.CLASS_ID ">  Classlist   </router-link>
        </button>
        <a  class="btn btn-primary mr-2 btn-md" @click="EnableEdit()" v-show="editable == 0" style ="position: absolute; top : 0 ;right:0;">Edit</a>
    </div>

  </div>
  <span>Editable: {{this.editable}}</span>
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
            editable : 0,
            /*
            Editin : {
                CLASS_NUMBER: this.Detailed_Course.CLASS_NUMBER,
                CLASS_NAME: this.Detailed_Course.CLASS_NAME,
                CLASS_INFO: this.Detailed_Course.CLASS_INFO,
                CLASS_TERM: this.Detailed_Course.CLASS_TERM,
            },*/
            CourseNum : null,
            Detailed_Course : null,
            RemoveStatus : null,
            EditStatus : 0,
        };
    },
    methods:{
        Find_SelectCourse(given_CourseNum){
            const Courselist = this.$store.getters.instructor_see_Courselist;
            let i = 0;
            while(i< Courselist.length){
                console.log("Courselist[i].CLASS_NUMBER:" + Courselist[i].CLASS_NUMBER )
                if(Courselist[i].CLASS_NUMBER === given_CourseNum){
                    return Courselist[i];
                }
                else{
                    i++;
                }
            }
            //const SelectCourse = this.Courselist.find((Course) => Course.CLASS_NUMBER === given_CourseNum );
        },
        async RemoveCourse(){
            const response = await axios.post('http://100.25.219.17/api/user/instructor/removeClass',{
                class_id : this.Detailed_Course.CLASS_ID
                },{headers: {'Content-type': 'application/json',}});
            if(response.data.success === true){
                this.RemoveStatus = true;
                this.$router.push('/instructor/CourseRemove');
            }
            else{
                this.RemoveStatus = false;
                return false;
            }
        },
        EnableEdit(){
            if(this.editable === 0){
                this.editable = 1;
            }
        },
        async handleEdit(){
            const response = await axios.post('http://100.25.219.17/api/user/instructor/editClass',{
                CLASS_ID : this.Detailed_Course.CLASS_ID,
                CLASS_NUMBER:this.Detailed_Course.CLASS_NUMBER ,
                CLASS_NAME: this.Detailed_Course.CLASS_NAME,
                CLASS_INFO: this.Detailed_Course.CLASS_INFO,
                CLASS_TERM: this.Detailed_Course.CLASS_TERM
                },{headers: {'Content-type': 'application/json',}});
            if(response.data.success === true){
                this.EditStatus = 1;
                this.editable = 0;
                return true;
            }
            else{
                this.EditStatus = 0;
                return false;   
            }
        }
    },
    created(){
        this.EditStatus = null;
        this.RemoveStatus = null;
        //this.editable = 0;
        this.CourseNum = this.$route.params.CLASSNAME;
        this.Detailed_Course = this.Find_SelectCourse(this.CourseNum);
        console.log("this is detailed course NUMBER: " +  this.Detailed_Course.CLASS_NUMBER);
    }
};
</script>

<style scoped>

</style>
