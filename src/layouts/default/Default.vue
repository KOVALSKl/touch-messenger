<template>
  <v-app class="d-flex flex-column" style="height: 100vh;">
    <v-container class="d-flex flex-column flex-nowrap fill-height" style="gap: 15px; max-height: 100%;">
      <header class="d-flex justify-sm-center justify-center justify-md-space-between justify-lg-space-between w-100">
        <div class="logo">
          <h1 class="font-weight-black text-sm-center text-center text-md-left text-lg-left">
            To<span class="text-primary">u</span>ch
          </h1>
        </div>
        <div
          class="d-none d-sm-none d-md-flex d-lg-flex align-center justify-center w-100"
          v-if="isLoggedIn"
        >
          <menu-tabs></menu-tabs>
        </div>
      </header>
      <default-view />
      <footer class="footer d-flex w-100 align-center justify-center" v-if="isLoggedIn & !isChat">
        <div class="d-flex d-sm-flex d-md-none d-lg-none align-center justify-center w-100"
             id="menu">
          <menu-tabs></menu-tabs>
        </div>
      </footer>
    </v-container>
  </v-app>
</template>

<script>
  import DefaultView from './View.vue'
  import ChatIcon from "@/components/Icons/ChatIcon";
  import FriendsIcon from "@/components/Icons/FriendsIcon";
  import SettingsIcon from "@/components/Icons/SettingsIcon";
  import MenuTabs from "@/components/MenuTabs/MenuTabs";;

  export default {
    name: 'Default',
    components: {
      MenuTabs,
      FriendsIcon,
      ChatIcon,
      SettingsIcon,
      DefaultView,
    },
    data() {

    },
    methods: {
    },

    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      isChat() {
        return this.$route.name === 'Chat';
      }
    }
  }
</script>

<style>
  #menu {
    bottom: 10px;
  }
</style>
