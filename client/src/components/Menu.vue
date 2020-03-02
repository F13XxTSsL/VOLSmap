<template>
  <div>
    <div v-if="auth === 'admin'">
      <nav class="menu grey darken-3">
        <router-link tag="li" to="/home">
          <v-icon dark class="icon fas fa-globe"></v-icon>
          Карта
        </router-link>
        <router-link tag="li" to="/partners">
          <v-icon dark class="icon fas fa-handshake"></v-icon>
          Котрагенты
        </router-link>
        <router-link tag="li" to="/contracts">
          <v-icon dark class="icon fas fa-file-contract"></v-icon>
          Договора
        </router-link>
        <router-link tag="li" to="/objects">
          <v-icon dark class="icon fas fa-satellite-dish"></v-icon>
          Объекты
        </router-link>
        <router-link tag="li" to="/line_objects">
          <v-icon dark class="icon fas fa-satellite"></v-icon>
          Линейные объекты
        </router-link>
        <router-link tag="li" to="/profiles">
          <v-icon dark class="icon fas fa-user"></v-icon>
          Пользователи
        </router-link>
        <router-link tag="li" to="/"><span @click="logOut"><v-icon dark class="icon fas fa-sign-out-alt"></v-icon>Выйти</span>
        </router-link>
        <li class="hamburger">
          <v-icon v-show="openIcon" @click="openMenu" dark class="icon fas fa-angle-double-down"></v-icon>
          <v-icon v-show="closeIcon" @click="closeMenu" dark class="icon fas fa-times"></v-icon>
        </li>
      </nav>
    </div>
    <div v-else-if="auth === 'operator'">
      <nav class="menu grey darken-3">
        <router-link tag="li" to="/home">
          <v-icon dark class="icon fas fa-globe"></v-icon>
          Карта
        </router-link>
        <router-link tag="li" to="/partners">
          <v-icon dark class="icon fas fa-handshake"></v-icon>
          Котрагенты
        </router-link>
        <router-link tag="li" to="/contracts">
          <v-icon dark class="icon fas fa-file-contract"></v-icon>
          Договора
        </router-link>
        <router-link tag="li" to="/">
          <span @click="logOut"><v-icon dark class="icon fas fa-sign-out-alt"></v-icon>Выйти</span>
        </router-link>
        <li class="hamburger" @click="openMenu">
          <v-icon dark class="icon fas fa-angle-double-down"></v-icon>
        </li>
      </nav>
    </div>
  </div>
</template>


<script>
  import EventBus from "./EventBus";

  export default {
    data() {
      return {
        auth: '',
        drawer: true,
        mini: true,
        openIcon: true,
        closeIcon: false
      }
    },
    methods: {
      logOut() {
        localStorage.removeItem('usertoken')
        localStorage.removeItem('status')
        this.auth = ''
      },
      openMenu() {
        let menu = document.querySelector('.menu')
        menu.classList.toggle('open')
        this.openIcon = false
        this.closeIcon = true
      },
      closeMenu() {
        let menu = document.querySelector('.menu')
        menu.classList.toggle('open')
        this.openIcon = true
        this.closeIcon = false
      },
    },
    mounted() {
      EventBus.$on('logIn', (status) => {
        this.auth = status
      })
      this.auth = localStorage.getItem('status')
    }
  };
</script>

<style lang="scss" scoped>
  .menu {
    height: 80px;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    list-style: none;
    padding: 0;
    padding-right: 30px;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    opacity: 0.8;
    box-shadow: 0px 1px 20px black;
  }

  .menu li {
    color: #fff;
    margin-left: 40px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
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

  .icon {
    margin-right: 10px;
  }

  .hamburger {
    display: none!important;
  }

  @media(max-width: 1070px) {
    .menu {
      padding-right: 15px;

      li {
        margin: 0px 15px !important;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
          margin: 0px 0px 5px;
        }

        &.router-link-active {
          span {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

        }
      }
    }
  }

  @media(max-width: 772px) {
    .menu {
      display: flex;
      flex-direction: column;
      height: auto;
      padding: 20px;
      padding-bottom: 0px;
      z-index: 400;
      transition: all 0.5s;
      transform: translateY(-590px);

      li {
        margin: 15px 0px !important;
      }

      .hamburger {
        z-index: 400;
        opacity: 1 !important;
        width: 100px;
        height: 35px;
        display: flex!important;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px !important;
        margin-top: 20px !important;
        cursor: pointer;

        .v-icon {
          margin-bottom: 0px;
        }
      }

      &.open {
        transform: translateY(0px);
      }
    }
  }
</style>
