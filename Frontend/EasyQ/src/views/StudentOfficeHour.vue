<template>
    <div class="container">
       <div class="row">
           <div class="col">
               <form @submit.prevent="startQueue">
                    <div class="form-group row">
                        <!-- <label for="staticClassNumber" class="col-sm-2 col-form-label">Class Number</label> -->
                        <div class="col-sm-10">Class Number: {{classNumber}}</div>
                            <!-- <input type="text" readonly class="form-control-plaintext" id="staticClassNumber" value={{classNumber}}> -->
                        
                        <!-- <label for="staticClassName" class="col-sm-2 col-form-label">Class Name</label> -->
                        <div class="col-sm-10">Class Name: {{className}}</div>
                            <!-- <input type="text" readonly class="form-control-plaintext" id="staticClassName" value={{className}}> -->
                        <!-- <label for="staticTA" class="col-sm-2 col-form-label">TA</label> -->
                        <div class="col-sm-10">TA Name: {{TAName}}</div>
                        <!-- <div class="col-sm-10">Qestion: {{userQuestion}}</div> -->
                            <!-- <input type="text" readonly class="form-control-plaintext" id="staticClassNumber" value={{TAName}}> -->
                        <div class="col-sm-10">
                            <label for="exampleFormControlTextarea1" class="form-label">Question:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="userQuestion"></textarea>
                        </div>
                        
                        <div class="col-sm-10">The position of queueing: {{queueIndex}}</div>
                        <div class="col-sm-10">Meeting Link: {{meetingLink}}</div>
                        <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary" style="margin-top:10px; margin-right:20px" v-if="isQueue">Queue</button>
                        <button type="quit" class="btn btn-primary" style="margin-top:10px"  @click="quitQueue">
                            <router-link to= "/StudentHome">Quit</router-link>
                        </button>
                    </div>
                    </div>
                </form>
           </div>
          
       </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {

    mounted: function() {
        this.officehourInfo();
        // window.setInterval(() => {
        //     this.getLength()
        //     }, 5000)

        this.timer = setInterval (() => {
            this.getLength()
        }, 1000)
                 
    },
    beforeDestroy(){
        clearInterval(this.timer);
        this.timer = null;
    },
    destroyed() {
        clearInterval(this.timer);
        this.timer = null;
    },

    // function quit(params) {
        
    // }

    data(){
        return{
            // isQueue: false,
            isQuit: false,
            userId: getCookie('id'),
            TAName: '',
            TAId: '',
            classNumber: '',
            meetingLink: '',
            queueIndex: '',
            className: '',
            classId : this.$route.params.classId,
            officehourId: '',
            startQ: '',
            isActive: false,
            userQuestion: '',
            isQueue: true,
            timer: null
        }
    },
    // created(){
    //     this.handleQueue()
    // },
    methods:{

        async officehourInfo(){
            var data = { 
                classId: this.classId,
                userId: this.userId
            }
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/display',data,{headers: {'Content-type' : 'application/json',}});
            console.log("get class info",response.data)
            
            this.className = response.data.CLASS_NAME;
            this.classId = response.data.CLASS_ID;
            this.classNumber = response.data.CLASS_NUMBER;
            this.TAName = response.data.TA_NAME;
            this.TAId = response.data.TA_ID;
            this.officehourId = response.data.OFFICE_HOUR_ID;
        },

        async startQueue() {
            var data = { 
                classId: this.classId,
                userId: this.userId,
                userQuestion: this.userQuestion
            }
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/join',data,{headers: {'Content-type' : 'application/json',}});
            // console.log("This is a test point");
            // console.log("res",response.data);
            this.startQ = response.data.isinQueue;
            this.className = response.data.CLASS_NAME;
            this.classId = response.data.CLASS_ID;
            this.classNumber = response.data.CLASS_NUMBER;
            this.TAName = response.data.TA_NAME;
            this.TAId = response.data.TA_ID;
            this.officehourId = response.data.OFFICE_HOUR_ID;
            this.queueIndex = response.data.QUEUE_INDEX;
            this.isQueue = false;
            // this.isActive = response.isActive
        },
        async getLength() {
            var data = {
                classId: this.classId,
                userId: this.userId,
                officehourId: this.officehourId
            }
            // test officehour id
            console.log("data", data)
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/inqueue',data,{headers: {'Content-type' : 'application/json',}});
            this.startQ = response.data.isinQueue;
            console.log(response.data.isinQueue);
            if(this.startQ == true){
                console.log("In the queue");
                this.queueIndex = response.data.QUEUE_INDEX;
            }
            else{
                console.log("Not in the queue");
                this.queueIndex = response.data.QUEUE_INDEX;
                // this.meetingLink = response.data.MEETING_LINK
            }     
        },

        async quitQueue() {
            var data = { 
                classId: this.classId,
                userId: this.userId,
                officehourId: this.officehourId
            }
            // isQuit: true => quit successfully
            // isQuit: false =>something error
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/quit',data,{headers: {'Content-type' : 'application/json',}});
            this.isQuit = response.data.isQuit;
            this.isQueue = true;
            if(this.isQuit == true)
            {
                console.log("quit successfully");
                alert("Quit successfully");
            }
            else{
                console.log("Something wrong");
                alert("Something wrong");
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
</script>


