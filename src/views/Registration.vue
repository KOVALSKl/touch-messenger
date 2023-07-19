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
              :model-value="name"
              label="Ваше имя"
              variant="outlined"
              placeholder="Jhon"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              :model-value="surname"
              label="Ваша фамилия"
              variant="outlined"
              placeholder="Doe"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              :model-value="email"
              label="Ваш email"
              placeholder="example@gmail.com"
              variant="outlined"
              type="email"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              :model-value="username"
              label="Ваш login"
              placeholder="example"
              variant="outlined"
              name="username"
              hide-details
              clearable
            >
            </v-text-field>
            <v-text-field
              :model-value="password"
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
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </router-view>
</template>

<script>
  import axios from "axios";
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
      login() {
        axios.post(
          process.env.VITE_API_LINK + '/login',
          {
            username: this.username,
            password: this.password,
          }
        )
          .then(response => console.log(response.data))
      }
    }
  }
</script>

<style>

</style>
