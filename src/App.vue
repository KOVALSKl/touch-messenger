<template>
  <router-view />
</template>

<script>
  import Cookies from "js-cookie";
  import jwtDecode from "jwt-decode";

  export default {
    name: 'App',
    components: {},
    computed: {
      userLoggedIn() {
        return this.$store.state.isLoggedIn;
      }
    },
    //https://touch-messenger.onrender.com - LINK
    methods: {
      createConnection() {
        let token = Cookies.get(import.meta.env.VITE_TOKEN_NAME)
        const userConnection = new WebSocket(
          `ws://${import.meta.env.VITE_API_LINK_PAYLOAD}/communication/ws?auth_token=${token}`
        )

        userConnection.onopen = () => {
          this.$store.commit(
            'setUserConnection',
            userConnection
          )
          console.log('Connected')
        }

        userConnection.onclose = () => {
          this.$store.commit(
            'setUserConnection',
            null
          )
        }
      },

      getUserFromToken() {
        let token = Cookies.get(import.meta.env.VITE_TOKEN_NAME)
        const userModel = jwtDecode(token)

        this.$store.commit('setUser', userModel);
        console.log(this.$store.state.user)
      }
    },

    watch: {
      userLoggedIn(userStatus) {
        if (userStatus) {
          this.createConnection()
          this.getUserFromToken()
        }
      }
    },
  }
</script>
