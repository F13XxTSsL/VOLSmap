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
  .loader{
    position: fixed;
    left: 0;
    right: 0;
    top: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer-table {
    font-size: 0.875rem;
    height: 48px;
    padding: 16px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
    display: flex;
    justify-content: space-between;
    max-width: 835px;
    border-radius: 0px 0px 5px 5px;
  }
</style>
