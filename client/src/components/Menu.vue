<template>
<!--    <v-card>-->
<!--        <v-navigation-drawer-->
<!--                v-model="drawer"-->
<!--                :mini-variant.sync="mini"-->
<!--                permanent-->
<!--        >-->
<!--            <v-list-item class="px-2">-->
<!--                <v-list-item-avatar>-->
<!--                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>-->
<!--                </v-list-item-avatar>-->

<!--                <v-list-item-title>John Leider</v-list-item-title>-->

<!--                <v-btns-->
<!--                        icon-->
<!--                        @click.stop="mini = !mini"-->
<!--                >-->
<!--                    <v-icon>mdi-chevron-left</v-icon>-->
<!--                </v-btns>-->
<!--            </v-list-item>-->

<!--            <v-divider></v-divider>-->

<!--            <v-list dense>-->
<!--                <v-list-item-->
<!--                        v-for="item in items"-->
<!--                        :key="item.title"-->
<!--                        :link="item.link"-->
<!--                >-->
<!--                    <v-list-item-icon>-->
<!--                        <v-icon>{{ item.icon }}</v-icon>-->
<!--                    </v-list-item-icon>-->

<!--                    <v-list-item-content>-->
<!--                        <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--                    </v-list-item-content>-->
<!--                </v-list-item>-->
<!--            </v-list>-->
<!--        </v-navigation-drawer>-->
<!--    </v-card>-->
    <div>
        <div v-if="auth === 'admin'">
            <nav class="menu grey darken-3">
                <router-link tag="li" to="/home"><v-icon dark class="icon fas fa-globe"></v-icon>Карта</router-link>
                <router-link tag="li" to="/partners"><v-icon dark class="icon fas fa-handshake"></v-icon>Партнеры</router-link>
                <router-link tag="li" to="/contracts"><v-icon dark class="icon fas fa-file-contract"></v-icon>Контракты</router-link>
                <router-link tag="li" to="/objects"><v-icon dark class="icon fas fa-satellite-dish"></v-icon>Объекты</router-link>
                <router-link tag="li" to="/line_objects"><v-icon dark class="icon fas fa-satellite"></v-icon>Линейные объекты</router-link>
                <router-link tag="li" to="/"><span @click="logOut"><v-icon dark class="icon fas fa-sign-out-alt"></v-icon>Выйти</span></router-link>
            </nav>
        </div>
        <div v-else-if="auth === 'operator'">
            <nav class="menu grey darken-3">
                <router-link tag="li" to="/home"><v-icon dark class="icon fas fa-globe"></v-icon>Карта</router-link>
                <router-link tag="li" to="/partners"><v-icon dark class="icon fas fa-handshake"></v-icon>Партнеры</router-link>
                <router-link tag="li" to="/contracts"><v-icon dark class="icon fas fa-file-contract"></v-icon>Контракты</router-link>
                <router-link tag="li" to="/">
                    <span @click="logOut"><v-icon dark class="icon fas fa-sign-out-alt"></v-icon>Выйти</span>
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
                auth: '',
                drawer: true,
                items: [
                    { title: 'Карта', icon: 'mdi-home-city', link: '<router-link tag="li" to="/home"><v-icon dark class="icon fas fa-globe"></v-icon>Карта</router-link>' },
                    { title: 'Партнеры', icon: 'mdi-account' },
                    { title: 'Контракты', icon: 'mdi-account-group-outline' },
                ],
                mini: true,
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
    .icon {
        margin-right: 10px;
    }
</style>
