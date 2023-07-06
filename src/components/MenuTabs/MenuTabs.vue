<template>
  <div color="primary">
    <v-tab>
      <router-link to="chats">
        <touch-chat-icon/>
      </router-link>
    </v-tab>

    <v-tab>
      <router-link to="friends">
        <friend-icon/>
      </router-link>
    </v-tab>

    <v-tab>
      <router-link to="settings">
        <settings-icon/>
      </router-link>
    </v-tab>
  </div>
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

  a svg path {
    fill: #000000;
  }

  a.router-link-active svg path{
    fill: var(--primary-color);
    fill-opacity: 1;
  }
</style>
