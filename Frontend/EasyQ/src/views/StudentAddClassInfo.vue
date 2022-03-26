<template>
    <div class="add class info">
        
        <form @submit.prevent="add">
            
            <div class="row">
                <div class="col" style="margin-left: 70px; margin-top:30px">
                    <label for="exampleFormControlInput1">Class Number</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="input.classNumber">
                    <label for="exampleFormControlInput1" style="margin-top:30px">Invitation code</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="input.invitationCode">
                    </div>
            </div>
            <button type="submit" class="btn btn-warning btn-md my-2 btn-block" style="margin-left:70px; margin-top:30px" @click="add">Submit</button>
            <button class="btn btn-warning btn-md my-2 btn-block" style="margin-left:10px" > 
                <router-link :to="'/StudentHome'">Return</router-link>
            </button>
    </form>
        <div class="alert alert-success" v-if="isSuccess" style="margin-top:20px">Successfully added!</div>
    </div>
</template>
<script>

import axios from 'axios'
export default {
    // mounted: function(){
    //     this.getInfo();
    // },
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
        

        async add(){

            // var data = {
            //     userId: this.
            // }

            try{
                console.log(this.userId); //for test
                const response = await axios.post('http://100.25.219.17/api/user/student/addclass',{
                userId: this.userId,
                // term: this.input.term,
                classNumber: this.input.classNumber,
                // className: this.input.className,
                invitationCode: this.input.invitationCode,
                },
                {
                    headers:
                    {
                        'Content-type':'application/json',
                    }
                });
                console.log(response.data)
                if(response.data.isclassexisted == false)
                {
                    console.log('Class not exists!');
                    alert('Class not exists!');
                    this.isSuccess = false;
                }
                else
                {
                    if(response.data.isEnrolled == true)
                    {
                        console.log('You has been enrolled in this class');
                        alert('You has been enrolled in this class');
                        this.isSuccess = false;
                    }
                    else{
                        if(response.data.isCodeRight == false)
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
