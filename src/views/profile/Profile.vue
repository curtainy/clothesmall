<template>
  <div id="profile">
    <nav-bar class="profile-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <login/>
    <message/>
    <about-cart/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Login from "./childComps/Login"
  import Message from "./childComps/Message"
  import AboutCart from "./childComps/AboutCart"

  export default {
    name: "Profile",
    components: {
      Message,
      NavBar,
      Login,
      AboutCart
    }
  }
</script>

<style scoped>
  .profile-bar{
    background-color: var(--color-high-text);
    color: #fff;
  }

</style>
