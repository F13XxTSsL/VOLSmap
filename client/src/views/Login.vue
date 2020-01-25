<template>
  <div class="login margin__top">
    <v-app id="inspire">
      <v-content>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="darken-3"
                  dark
                  flat
                >
                  <v-toolbar-title>Форма входа</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="loginIn">
                    <v-text-field
                      label="Ваш логин"
                      name="login"
                      v-model="login"
                      type="text"
                      required
                    />

                    <v-text-field
                      id="password"
                      label="Ваш пароль"
                      v-model="password"
                      name="password"
                      type="password"
                      required
                    />
                    <v-spacer />
                    <v-btn
                      type="submit"
                      color="darken-3"
                    >
                      Войти
                    </v-btn>
                  </v-form>
                </v-card-text>
                <v-card-actions />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
    import axios from 'axios'
    import router from "../router";
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                login: '',
                password: '',
            }
        },
        methods: {
            loginIn() {
                axios.post('http://localhost:3000/login', {
                    login: this.login,
                    password: this.password
                }).then((res) => {
                  this.$store.state.statusProfile = res.data.status_user
                    localStorage.setItem('usertoken', res.data)
                    this.login = ''
                    this.password = ''
                    router.push({name: 'home'})
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>