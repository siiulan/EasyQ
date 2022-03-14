<template>
    <div class="add class info">
        <form @submit.prevent="onAddClass">
            <div class="form-group" style="margin-left: 70px; margin-top:40px ;margin-right:70px">
                <label for="exampleFormControlSelect1">Term</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="term">
                <!-- <select class="form-control" id="exampleFormControlSelect1" v-model="term">
                <option>21 Winter</option>
                <option>21 Spring</option>
                <option>21 Fall</option>
                <option>22 Winter</option>
                <option>22 Spring</option>
                <option>22 Fall</option>
                </select> -->
            </div>
            <div class="row">
                <div class="col" style="margin-left: 70px; margin-top:30px">
                    <label for="exampleFormControlInput1">Class Number</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="classNumber">
                    <label for="exampleFormControlInput1" style="margin-top:30px">Invitation code</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="invitationCode">
                    </div>

                <div class="col" style="margin-right:70px; margin-top:30px">
                    <label for="exampleFormControlSelect1">Class Name</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="className">
                </div>     
            </div>
         
        <!-- <div class="form-group" style="margin-left: 70px; margin-top:30px; margin-right: 150px">
            <label for="exampleFormControlSelect2">Instructor Name</label>
            <input type="instructor" class="form-control" id="exampleFormControlInput1">
        </div>
            <div class="form-group" style="margin: 70px">
                <label for="exampleFormControlSelect2">Office hour schedule</label>
                <div class="row">
                    <div class="col">
                        <select class="form-control" id="weekday">
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                        <input type="time" class="form-control" id="exampleFormControlInput1">
                    </div>
                    <div class="col">
                        <input type="time" class="form-control" id="exampleFormControlInput1">
                    </div>
                    <div class="col">
                        <input type="time" class="form-control" id="exampleFormControlInput1">
                    </div>
                </div>
            </div> -->
            <!-- <div class="form-group" style="margin: 70px">
                <label for="exampleFormControlTextarea1">Class Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div> -->
            <button type="submit" class="btn btn-primary" style="margin-left:70px; margin-top:30px">Submit</button>
    </form>
        <div class="alert alert-success" v-if="isSuccess" style="margin-top:20px">Successfully added!</div>
    </div>
</template>
<script>

import axios from 'axios'
export default {
    mounted: function(){
        this.getInfo();
    },
    data() {
        return{
            input:{
                term: '',
                classNumber: '',
                className: '',
                invitationCode: ''
            },
            // username: getCookie("username"), // for backend to save class info
            isSuccess: false,
            userId : getCookie("id"),
            couseId: this.$route.params.CLASS_ID,
        }
    },
    
    methods:{

        // async getInfo(){
        //     var data = {
        //         courseId : this.courseId,
        //         userId: this.userId
        //     }
        //     const response = await axios.post('http://54.163.38.93/api/user/student/classes', {
        //         data
        //     },{headers:{'Content-type': 'application/json'}});
            
        // },
        

        async add(){

            // var data = {
            //     userId: this.
            // }

            try{
                const response = await axios.post('http://54.163.38.93/api/user/student/addclass',{
                term: this.input.term,
                classNumber: this.input.classNumber,
                className: this.input.className,
                invitationCode: this.input.invitationCode,
                },
                {
                    headers:
                    {
                        'Content-type':'application/json',
                    }
                });

                if(response.isclassexisted == false)
                {
                    console.log('Class not exists!');
                    alert('Class not exists!');
                    this.isSuccess = false;
                }
                else
                {
                    if(response.isEnrolled == true)
                    {
                        console.log('You has been enrolled in this class');
                        alert('You has been enrolled in this class');
                        this.isSuccess = false;
                    }
                    else{
                        if(response.isCodeRight == false)
                        {
                            console.log('Wrong code');
                            alert('Wrong code!');
                            this.isSuccess = false;
                        }
                        else{
                            this.isSuccess = true;    
                        }
                    }
                }
            }
            catch(error){
                console.log(error);
                alert('Wrong request');
                this.isSuccess = false;
                return false;
            }
        }
    }
};
function getCookie(cname){
    let name = cname + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let ca = decodeCookie.split(';');
    for(let i = 0; i < ca.length; i++){
        let c = ca[i];
        while(c.charAt(0) == ' '){
        c = c.substring(1);
        }
        if(c.indexOf(name) == 0){
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
// }
</script>
