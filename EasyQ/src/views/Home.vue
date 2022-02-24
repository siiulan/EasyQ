<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Welcome to EasyQ</h1>
          <div class="button-block">
            <button class="button is-xl is-dark">
              <router-link to = "/signup" class = "navbar-item">Sign Up to join office hour</router-link> 
            </button>
          </div>
        </div>
      </div>
    </section>
    <Events-list />
    <div class = "page-bottom">
      <a>
        <strong class="is-size-4">EasyQ</strong>
        <span aria-hidden="true"></span>
        <h1>@2022 </h1>
      </a>
    </div>
  </div>
</template>
<script>
import EventsList from '../components/EventsList.vue';
  export default {
    name: 'home',
    components: {
      EventsList
    },
  };
</script>
<style lang="scss" scoped>
  .hero {
    text-align: center;
    background-image: url('https://uwaterloo.ca/about/sites/default/files/styles/uw_is_media_x_large/public/uploads/images/waterloo-sunset82.jpg?h=2909f1df&itok=XUtL8gNj');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .hero-body .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
    .button {
      margin-right: 50px;
      padding-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>