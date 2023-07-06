<template>
  <v-tabs color="primary">
    <v-tab>
      <touch-chat-icon/>
    </v-tab>

    <v-tab>
      <friend-icon/>
    </v-tab>

    <v-tab>
      <settings-icon/>
    </v-tab>
  </v-tabs>
</template>

<script>
  import TouchChatIcon from "@/components/Icons/ChatIcon";
  import FriendIcon from "@/components/Icons/FriendsIcon";
  import SettingsIcon from "@/components/Icons/SettingsIcon";
  export default {
    name: 'MenuTabs',
    components: {SettingsIcon, FriendIcon, TouchChatIcon},
  }
</script>

<style>
  .v-slide-group__container .v-btn.v-tab--selected .v-btn__content .v-tab__slider {
    opacity: 0;
  }

  .v-slide-group__container .v-btn.v-tab--selected .v-btn__content svg path{
    fill: var(--primary-color);
    fill-opacity: 1;
  }
</style>
