<template>
  <router-view>
    <div class="d-flex flex-column align-center fill-height justify-center">
      <h2>Аутентификация</h2>
      <v-card width="370" elevation="0">
        <v-card-text>
          <v-form
            class="d-flex flex-column"
            style="gap: 10px;"
            @submit="login"
          >
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
            <password-field
              v-model="password"
              label="Ваш пароль"
              variant="outlined"
              name="password"
              hide-details
            />
            <v-btn
              variant="flat"
              color="primary"
              type="submit"
              elevation="1"
              :loading="loading"
            >
              войти
            </v-btn>
          </v-form>
          <div class="d-flex justify-center mt-3" v-if="isLoggedIn">
            Еще нет аккаунта?
            <router-link class="ml-1" to="/signup">
              Зарегестрируйтесь
            </router-link>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </router-view>
</template>

<script>
  import axios from "axios";
  import Cookies from 'js-cookie'

  //Components
  import PasswordField from '@/components/PasswordField/PasswordField'

  export default {
    name: 'RegistrationPage',
    components: {
      PasswordField,
    },
    data() {
      return {
        username: null,
        password: null,
        loading: false,
      }
    },
    methods: {
      login(e) {
        e.preventDefault()
        this.loading = true;

        axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/login',
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            username: this.username,
            password: this.password
          }
        })
          .then((response) => {
            let token = response.data
            Cookies.set(import.meta.env.VITE_TOKEN_NAME,
              token.access_token,
              {expires: new Date(token.expires)}
            )
            this.$store.commit('changeUserStatus', true)
            this.$router.push('/chats')
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
