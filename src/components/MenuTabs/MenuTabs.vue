<template>
  <div color="primary">
      <router-link to="chats">
        <v-tab>
          <touch-chat-icon/>
        </v-tab>
      </router-link>
    
      <router-link to="friends">
        <v-tab>
          <friend-icon/>
        </v-tab>
      </router-link>

      <router-link to="settings">
        <v-tab>
          <settings-icon/>
        </v-tab>
      </router-link>
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

  a:active, a:link {
    color: var(--primary-color)
  }

  a svg path {
    fill: #000000;
  }

  a.router-link-active svg path{
    fill: var(--primary-color);
    fill-opacity: 1;
  }
</style>
