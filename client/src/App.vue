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
    margin-top: 100px;
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
    max-width: 831px;
    border-radius: 0px 0px 5px 5px;
  }
  .id_cell {
    background-color: #FFE0B2;
  }
  .name_partner {
    background-color: #C8E6C9;
  }
  .inn_partner {
    background-color: #F0F4C3;
  }
  .contacts_partner {
    background-color: #B3E5FC;
  }
  .comments {
    background-color: #D1C4E9;
  }
  .links {
    background-color: #F8BBD0;
  }
  .action_cell {
    background-color: #FFCDD2;
  }
  .data_cell {
   background-color: #FFCCBC;
  }
  .rent_cell {
    background-color: #FFF9C4;
  }
  .rent_cell_one {
    background-color: #FFFDE7;
  }
  .placement {
    background-color: #B2DFDB;
  }
  .responsible {
    background-color: #D7CCC8;
  }
  .type {
    background-color: #FFECB3;
  }
  .adress {
    background-color: #B2EBF2;
  }
  .status {
    background-color: #C5CAE9;
  }
  .coords {
    background-color: #F0F4C3;
  }
  .distance {
    background-color: #99CCCC;
  }
  .start_point {
    background-color: rgb(220, 237, 200);
  }
  .end_point {
    background-color: rgb(200, 230, 201);
  }
</style>
