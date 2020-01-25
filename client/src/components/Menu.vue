<template>
  <div>
  <nav class="menu grey darken-3" v-if="this.$store.state.statusProfile === 'admin'">
    <router-link tag="li" to="/home">Карта</router-link>
    <router-link tag="li" to="/partners">Партнеры</router-link>
    <router-link tag="li" to="/contracts">Контракты</router-link>
    <router-link tag="li" to="/objects">Объекты</router-link>
    <router-link tag="li" to="/line_objects">Линейные объекты</router-link>
    <router-link tag="li" to="/login" @="logOut">Выйти</router-link>
  </nav>
  <nav class="menu grey darken-3" v-else-if="this.$store.state.statusProfile === 'operator'">
    <router-link tag="li" to="/home">Карта</router-link>
    <router-link tag="li" to="/partners">Партнеры</router-link>
    <router-link tag="li" to="/contracts">Контракты</router-link>
    <router-link tag="li" to="/login" @="logOut">Выйти</router-link>
  </nav>
<!--  <nav class="menu grey darken-3" v-else-if="this.props.profile = 'operator'">-->
<!--    <router-link tag="li" to="/home">Карта</router-link>-->
<!--    <router-link tag="li" to="/partners">Партнеры</router-link>-->
<!--    <router-link tag="li" to="/contracts">Контракты</router-link>-->
<!--    <router-link tag="li" to="/login" @="logOut">Выйти</router-link>-->
<!--  </nav>-->
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    logOut() {
      localStorage.removeItem('usertoken')
      this.$store.state.statusProfile = ''
    }
  }
};
</script>

<style scoped>
  .menu {
    height: 80px;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    opacity: 0.9;
    box-shadow: 0px 1px 20px black;
  }
  .menu li {
    color: #fff;
    margin-left: 40px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .menu li:hover {
    opacity: 0.7;
  }
  .menu li:first-child {
    margin-left: 0px;
  }
  .menu li:last-child {
    margin-right: 40px;
  }
</style>
