<template>
  <nav class="menu amber darken-3">
    <router-link tag="li" to="/home">Карта</router-link>
    <router-link tag="li" to="/partners">Партнеры</router-link>
    <router-link tag="li" to="/contracts">Контракты</router-link>
    <router-link tag="li" to="/objects">Объекты</router-link>
    <router-link tag="li" to="/line_objects">Линейные объекты</router-link>
  </nav>
</template>

<script>
export default {
  data: () => ({
  }),
};
</script>

<style scoped>
  .menu {
    height: 60px;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
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
