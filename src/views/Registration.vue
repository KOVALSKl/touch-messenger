<template>
  <router-view>
    <div class="d-flex flex-column align-center fill-height justify-center">
      <h2>Регистрация</h2>
      <v-card width="370" elevation="0">
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
            <v-btn
              variant="flat"
              color="primary"
              type="submit"
              :loading="loading"
            >
              зарегестрироваться
            </v-btn>
          </v-form>
        </v-card-text>
        <div class="d-flex justify-center mb-10" v-if="isLoggedIn">
          Уже есть аккаунт?
          <router-link class="ml-1" to="/login">
            Войдите
          </router-link>
        </div>
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
        loading: false,
      }
    },
    methods: {
      login(e) {
        e.preventDefault()
        this.loading = true

        axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/signup',
          data: {
            name: this.name,
            surname: this.surname,
            login: this.username,
            email: this.email,
            password: this.password
          }
        })
          .then((response) => {
            let token = response.data
            console.log(token)
            if (token){
              Cookies.set(import.meta.env.VITE_TOKEN_NAME,
                token.access_token,
                {expires: new Date(token.expires)}
              )
              this.$store.commit('changeUserStatus', true)
            }
          })
          .finally(() => this.loading = false)
      },
    },
    computed: {
      isLoggedIn() {
        return !this.$store.state.isLoggedIn;
      }
    },
  }
</script>

<style>

</style>
