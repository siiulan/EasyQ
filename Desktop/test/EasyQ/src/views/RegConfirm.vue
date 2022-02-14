<template> 
<div className="container">
        <h3>
          <strong>Registration confirmed!</strong>
        </h3>
      <router-link :to="{name: '/signin'}"> Sign in here </router-link>
</div> 
</template>

<script>
 /*   export default { 
        data() {
            return {
                token : null,  
            }
        },
        methods:{
            async verifyUser(code){
                const response = await axios.get(API_URL + "confirm/" + code);
                this.token = response.data;
            }

        }
    }*/
</script>
<style scoped>
</style>
