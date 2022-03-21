<template>
<div class="container-fluid py-5 h-100">
    <button class="btn btn-warning mr-2 btn-lg btn-block" style ="position: absolute; bottom: 0;right:0;" > 
             <router-link to='/instructor/main'>  Return   </router-link>
  </button>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="member in Memberlist" :key="member.USER_ID">
       <td>{{ member.FIRST_NME }}</td> 
       <td>{{ member.LAST_NME }}</td>
       <td>{{ member.USER_ROLE }}</td>  
    </tr>
  </tbody>
</table>

<button class="btn btn-warning mr-2 btn-lg btn-block" > 
    <router-link :to="'/instructor/CourseDetail/' + 'addStudent/' + this.CourseID">    Add a student   </router-link>
</button>
<button class="btn btn-warning mr-2 btn-lg btn-block" > 
    <router-link :to="'/instructor/CourseDetail/' +'addTA/'+ this.CourseID ">  Add a TA   </router-link>
</button>
</div>
</template>

<script>
import axios from'axios'
export default {
    data(){
        return{
        CourseID : null,
        invitation_code : null,
        Memberlist : []
        /*{
 
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
    }*/
    }
    },
    methods:{
        async GetStudent(){   
            console.log("COURSE ID:" + this.CourseID);      
            const res = await axios.post('http://54.163.38.93/api/user/instructor/getClassMembers',
                    {
                        class_id : this.CourseID
                    },{headers: {'Content-type': 'application/json',}});
                    console.log("member list:" + res.data.memberList.length);
                    this.Memberlist = res.data.memberList;
        }
    },
    created(){
        this.CourseID = this.$route.params.CLASSID;
        console.log("COURSE ID:" + this.CourseID);
        this.GetStudent();
        console.log("this member list:" + this.memberList.length);
    }
}
</script>

<style scoped>

</style>
