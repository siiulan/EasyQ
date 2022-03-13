<template>
    <div class="container">
       <div class="row">
           <div class="col">
               <form>
                    <div class="form-group row">
                        <!-- <label for="staticClassNumber" class="col-sm-2 col-form-label">Class Number</label> -->
                        <div class="col-sm-10">Class Number: {{classNumber}}</div>
                            <!-- <input type="text" readonly class="form-control-plaintext" id="staticClassNumber" value={{classNumber}}> -->
                        
                        <!-- <label for="staticClassName" class="col-sm-2 col-form-label">Class Name</label> -->
                        <div class="col-sm-10">Class Name: {{className}}</div>
                            <!-- <input type="text" readonly class="form-control-plaintext" id="staticClassName" value={{className}}> -->
                        <!-- <label for="staticTA" class="col-sm-2 col-form-label">TA</label> -->
                        <div class="col-sm-10">TA Name: {{TAName}}</div>
                            <!-- <input type="text" readonly class="form-control-plaintext" id="staticClassNumber" value={{TAName}}> -->
                        
                        <!-- <label for="staticQueue" class="col-sm-2 col-form-label">The position of queueing</label>   -->
                        <div class="col-sm-10">The position of queueing: {{queueIndex}}</div>
                            <!-- <input type="text" readonly class="form-control-plaintext" id="staticQueue" value={{queueIndex}}> -->
                        <div class="col-sm-10">Meeting Link: {{meetingLink}}</div>
                        <div class="col">
                        <button type="submit" class="btn btn-primary" style="margin-top:10px; margin-right:20px" @click="startQueue">Queue</button>
                        <button type="submit" class="btn btn-primary" style="margin-top:10px" @click="quitQueue">Quit</button>
                    </div>
                    </div>
                    <!-- <button type="submit" class="btn btn-primary" style="margin-top:30px">Submit</button> -->
                </form>
           </div>
          
           <!-- <div class="card">
               <label for="classnumber">Class Number</label>
                <input type="text" class="form-control" id="exampleFormControlInput1">
           </div> -->
       </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {

    mounted: function() {
        this.startQueue();
        window.setInterval(() => {
            this.getLength()
            }, 5000)
    },

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
            startQ: false,
            isActive: false,
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
            // OFFICE_HOUR_ID : Office_token,
            // CLASS_NUMBER : Class_Number,
            // CLASS_ID : class_id,
            // CLASS_NAME : class_Name,
            // TA_NAME : TA_name,
            // TA_ID : getOffice[0].USER_ID
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/display',{data},{headers: {'Content-type' : 'application/json',}});
            this.className = response.CLASS_NAME;
            this.classId = response.CLASS_ID;
            this.classNumber = response.CLASS_NUMBER;
            this.TAName = response.TA_NAME;
            this.TAId = response.TA_ID;
            this.officehourId = response.OFFICE_HOUR_ID;
        },

        async startQueue() {
            var data = { 
                classId: this.classId,
                userId: this.userId
            }
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/join',{data},{headers: {'Content-type' : 'application/json',}});
            // isinQueue: true,
            // OFFICE_HOUR_ID : Office_token,
            // CLASS_NUMBER : Class_Number, /
            // CLASS_ID : class_id, /
            // QUEUE_INDEX : data,
            // CLASS_NAME : item_classNumber[0].CLASS_NAME, /
            // TA_NAME : TA_name, /
            // TA_ID : getOffice[0].USER_ID /
            this.startQ = response.isinQueue;
            this.className = response.CLASS_NAME;
            this.classId = response.CLASS_ID;
            this.classNumber = response.CLASS_NUMBER;
            this.TAName = response.TA_NAME;
            this.TAId = response.TA_ID;
            this.officehourId = response.OFFICE_HOUR_ID;
            this.queueIndex = response.QUEUE_INDEX;
            // this.isActive = response.isActive
        },
        async getLength() {
            var data = {
                classId: this.classId,
                userId: this.userId,
                officehourId: this.OFFICE_HOUR_ID
            }
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/inqueue',{data},{headers: {'Content-type' : 'application/json',}});
            // "isinQueue": true,
            // "OFFICE_HOUR_ID": "00202",
            // "CLASS_NUMBER": "YES100",
            // CLASS_ID
            // "QUEUE_INDEX": 3,
            // "TA_NAME": "test TA1",
            // "CLASS_NAME": "Yes or Yes",
            // "TA_ID": "8"
            this.startQ = response.isinQueue;
            if(this.startQ == true){
                console.log("In the queue");
                this.className = response.CLASS_NAME;
                this.classId = response.CLASS_ID;
                this.classNumber = response.CLASS_NUMBER;
                this.TAName = response.TA_NAME;
                this.TAId = response.TA_ID;
                this.officehourId = response.OFFICE_HOUR_ID;
                this.queueIndex = response.QUEUE_INDEX;
            }
            else{
                console.log("Not in the queue");
                this.className = response.CLASS_NAME;
                this.classNumber = response.CLASS_NUMBER;
                this.TAName = response.TA_NAME;
                this.TAId = response.TA_ID;
                this.officehourId = response.OFFICE_HOUR_ID;
                this.queueIndex = response.QUEUE_INDEX;
                this.meetingLink = response.MEETING_LINK
            }     
        },

        async quitQueue() {
            var data = { 
                classId: this.classId,
                userId: this.userId
            }
            // isQuit: true => quit successfully
            // isQuit: false =>something error
            const response = await axios.post('http://54.163.38.93/api/user/student/officehour/quit',{data},{headers: {'Content-type' : 'application/json',}});
            this.isQuit = response.isQuit;
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


