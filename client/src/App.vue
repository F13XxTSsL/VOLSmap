<template>
  <v-app id="app">
    <Menu></Menu>
    <router-view></router-view>
  </v-app>
</template>
<script>

  import Menu from './components/Menu'


export default {
  name: 'App',
  components: {
    Menu
  },
  data: () => ({
  }),
};
</script>
<style lang="scss">
  .margin__top {
    margin-top: 80px;
  }
  body {
    overflow: hidden;
    &::-webkit-scrollbar { display: none}
  }
</style>
