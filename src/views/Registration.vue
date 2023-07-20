<template>
  <router-view>
    <div class="d-flex flex-column align-center justify-center">
      <h2>Регистрация</h2>
      <v-card width="370">
        <v-card-text>
          <v-form
            class="d-flex flex-column"
            style="gap: 10px;"
            @submit="login"
          >
            <v-text-field
              v-model="name"
              label="Ваше имя"
              variant="outlined"
              placeholder="Jhon"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="surname"
              label="Ваша фамилия"
              variant="outlined"
              placeholder="Doe"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              label="Ваш email"
              placeholder="example@gmail.com"
              variant="outlined"
              type="email"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="username"
              label="Ваш login"
              placeholder="example"
              variant="outlined"
              name="username"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              label="Ваш пароль"
              variant="outlined"
              type="password"
              name="password"
              hide-details
            >
            </v-text-field>
            <v-btn variant="flat" color="primary" type="submit">
              отправить
            </v-btn>
            <v-btn variant="flat" color="primary" @click="getChat">
              получить чаты пользователя
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </router-view>
</template>

<script>
  import axios from "axios";
  import Cookies from 'js-cookie'

  export default {
    name: 'RegistrationPage',
    data() {
      return {
        name: null,
        surname: null,
        username: null,
        password: null,
        email: null,
      }
    },
    methods: {
      login(e) {
        e.preventDefault()
        axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/login',
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'username': this.username,
            'password': this.password
          }
        })
          .then((response) => {
            let token = response.data
            Cookies.set(import.meta.env.VITE_TOKEN_NAME,
              token.access_token,
              {expires: new Date(token.expires)}
              )
          })
      },
      getChat() {
        axios({
          method: 'GET',
          url: import.meta.env.VITE_API_LINK + '/chats/',
          headers: {
            'Authorization': ['Bearer', Cookies.get(import.meta.env.VITE_TOKEN_NAME)].join(' ')
          }
        })
        .then((response) => console.log(response.data))
      }
    }
  }
</script>

<style>

</style>
