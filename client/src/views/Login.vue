<template>
    <div class="login">
        <v-app id="inspire">
            <v-content>
                <v-container
                        class="fill-height"
                        fluid
                >
                    <v-dialog class="error" v-model="dialogError" width="350px">
                      <v-alert type="error">
                        {{textError}}
                      </v-alert>
                    </v-dialog>
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
                                    <v-spacer/>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form @submit.prevent="loginIn">
                                        <v-text-field
                                                label="Ваш логин"
                                                name="login"
                                                v-model="login"
                                                type="text"
                                        />

                                        <v-text-field
                                                id="password"
                                                label="Ваш пароль"
                                                v-model="password"
                                                name="password"
                                                type="password"
                                        />
                                        <v-spacer/>
                                        <v-btn
                                                type="submit"
                                                color="darken-3"
                                        >
                                            Войти
                                        </v-btn>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions/>
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
  import EventBus from "../components/EventBus";

  export default {
    data() {
      return {
        login: '',
        password: '',
        dialogError: false,
        textError: ''
      }
    },
    mounted() {
      window.onbeforeunload = function () {
        localStorage.removeItem('usertoken')
        localStorage.removeItem('status')
      }
    },
    methods: {
      loginIn() {
        axios.post('http://localhost:3000/login', {
          login: this.login,
          password: this.password
        }).then((res) => {
          localStorage.setItem('usertoken', res.data)
          localStorage.setItem('status', res.data.status_user)
          this.login = ''
          this.password = ''
          router.push({name: 'home'})
          this.emitMethod(res.data.status_user)
        }).catch(err => {
            if (err) {
              this.dialogError = true
              this.textError = 'Не верно введен логин или пароль'
            }
          })
      },
      emitMethod(status) {
        EventBus.$emit('logIn', status)
      }
    }
  }
</script>

<style scoped>
    .error {
        margin-bottom: 0px;
  }

</style>