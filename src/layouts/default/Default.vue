<template>
  <v-app>
    <v-container>
      <header class="header d-flex">
        <div class="logo">
          <h1 class="font-weight-black">
            To<span class="text-primary">u</span>ch
          </h1>
        </div>
        <div class="d-none d-sm-none d-md-flex d-lg-flex align-center justify-center w-100">
          <menu-tabs></menu-tabs>
        </div>
      </header>
      <default-view />
      <footer>
        <div class="d-flex position-sticky position-sm-sticky d-sm-flex d-md-none d-lg-none align-center justify-center w-100">
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
  import MenuTabs from "@/components/MenuTabs/MenuTabs";

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
  }
</script>

<style>

</style>
