<template>
  <router-view>
    <div class="d-flex flex-column align-center justify-center fill-height">
      <v-btn class="bg-error" @click="logout">
        выйти из аккаунта
      </v-btn>
    </div>
  </router-view>
</template>

<script>
  import {cookieMixin} from "@/lib/mixins";

  export default {
    name: 'SettingsPage',
    mixins: [
      cookieMixin,
    ],
    methods: {
      logout() {
        this.deleteCookie(import.meta.env.VITE_TOKEN_NAME, '/');
        this.$router.push('/login')
      }
    }
  }
</script>
