<template>
<div class="container-fluid py-5 h-100">
<ul>
  <li class="card" py-5 v-for="course in courselist" :key="course">
      <div class="card-body">
    <h5 class="card-title"> Course name :  {{course}}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Term : winter </h6>
    <h6 class="card-subtitle mb-2 text-muted">Instructor : Rex </h6>
    <p class="card-text">Some description of the course......</p>
    <button class="btn btn-warning btn-md my-2 btn-block"> Details</button>
  </div>
 </li>
</ul>
</div>
</template>

<script>
 export default {
        data() {
            return {
                courselist: ['math','english','physics','chemistry'],
                selected : 0,

            }
        },
        methods:{
            async get_class(){
                    //const response = await axios.get();
                    //this.courselist = response.data.course;


            }
        }
 }



</script>

<style></style>