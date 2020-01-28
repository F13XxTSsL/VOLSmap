<template>
    <div>
        <div v-if="auth === 'admin'">
            <nav class="menu grey darken-3">
                <router-link tag="li" to="/home">Карта</router-link>
                <router-link tag="li" to="/partners">Партнеры</router-link>
                <router-link tag="li" to="/contracts">Контракты</router-link>
                <router-link tag="li" to="/objects">Объекты</router-link>
                <router-link tag="li" to="/line_objects">Линейные объекты</router-link>
                <router-link tag="li" to="/">
                    <span @click="logOut">Выйти</span></router-link>
            </nav>
        </div>
        <div v-else-if="auth === 'operator'">
            <nav class="menu grey darken-3">
                <router-link tag="li" to="/home">Карта</router-link>
                <router-link tag="li" to="/partners">Партнеры</router-link>
                <router-link tag="li" to="/contracts">Контракты</router-link>
                <router-link tag="li" to="/">
                    <span @click="logOut"> Выйти</span>
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script>
    import EventBus from "./EventBus";

    export default {
        data() {
            return {
                auth: ''
            }
        },
        methods: {
            logOut() {
                localStorage.removeItem('usertoken')
                localStorage.removeItem('status')
                this.auth = ''
            }
        },
      mounted() {
            EventBus.$on('logIn', (status) => {
                this.auth = status
            })
          this.auth = localStorage.getItem('status')
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
        opacity: 0.8;
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
