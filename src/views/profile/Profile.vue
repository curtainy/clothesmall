<template>
  <div id="profile">
    <nav-bar class="profile-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <top/>
    <message/>
    <about-cart/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Top from "./childComps/Top"
  import Message from "./childComps/Message"
  import AboutCart from "./childComps/AboutCart"

  export default {
    name: "Profile",
    components: {
      Message,
      NavBar,
      Top,
      AboutCart
    }
  }
</script>

<style scoped>
  .profile-bar{
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
