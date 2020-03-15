<template>
  <nav-bar class="bar">
    <div slot="center">商品分类</div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'CategoryBar',
  components: {
    NavBar
  }
}
</script>

<style>
  .bar{
    background-color: var(--color-high-text);
    color: #fff;
  }
</style>