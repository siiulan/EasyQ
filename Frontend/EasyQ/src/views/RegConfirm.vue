<template> 
<div className="container">
        <div class="alert alert-primary" role="alert">
  Registration has been confirmed !  <router-link to = "/signin" > Sign in here ! </router-link>. 
        </div>
      
</div> 
</template>

<script>
   export default { 
        data() {
            return {
                confirmed : null,  
            }
        },
        methods:{}/*
            async verifyUser(verifyToken){
                const response = await axios.get("http://52.55.84.132/api/user/confirm/" + verifyToken);
                this.confirmed = response.data.isConfirmed;
            }
        },
        created() {
            this.verifyUser(this.$route.params.token);
        }*/
    }
</script>
<style scoped>
</style>
