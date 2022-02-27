<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h2 class="navbar-item" href="/">
        <strong class="is-size-4">EasyQ</strong>
      </h2>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/about" class="navbar-item">About</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="$route.path != '/signin' && $route.path != '/signup' && loggedin != 'true'" >
            <a class="button is-dark">
              <router-link to = "/signin" class = "navbar-item">Sign In</router-link>
              <!-- <strong>Sign In</strong> -->
            </a>
          </div>
        </div>
        <div class="navbar-item is-size-5" v-if="loggedin == 'true'">{{username}}</div>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'Nav',

    data() {
      return {
        loggedin: getCookie("loggedin"),
        username: getCookie("username"),
      }
    },
  };
  //https://www.w3schools.com/js/js_cookies.asp
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
</script>
<style lang="scss" scoped>
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
    a {
      font-weight: bold;
      color: #d88d00;
      &.router-link-exact-active {
        color: #d88d00;
      }
    }
  }
</style>