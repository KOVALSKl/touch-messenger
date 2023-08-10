<template>
  <router-view>
    <loading-spinner v-if="loading"/>
    <div class="d-flex flex-column" style="gap: 15px;" v-else>
      <chat-card
        v-for="chat in this.chats"
        :chat-name="chat.chat_name"
        :id="chat.chat_id"
        :key="chat.chat_id"
        :unread-messages-count="chat.unread"
      >
        <template #chat-name>
          {{chat.chat_name}}
        </template>
        <template #last-message>
          {{chat.created_at}}
        </template>
      </chat-card>
      <v-dialog v-model="dialog" width="auto">
        <template #activator="{ props }">
          <v-btn
            class="start-new-chat-btn bg-primary"
            v-bind="props"
          >
            начать новый чат
          </v-btn>
        </template>

        <v-card>
          <v-card-title>Прикоснуться</v-card-title>
          <v-card-text>
            <loading-spinner v-if="dialogLoading"/>
            <div class="users d-flex flex-column" style="gap:10px;">
              <div
                v-for="user in users"
                :key="user.login"
                class="pa-1 d-flex justify-center align-center"
                style="height: 50px; border-radius: 15px;"
              >
                {{user.name}} {{user.surname}} aka {{user.login}}
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </router-view>
</template>

<script>
  import ChatCard from "@/components/ChatCard/ChatCard";
  import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
  import Cookies from 'js-cookie';
  import axios from 'axios';
  import {cookieMixin} from '@/lib/mixins';

  export default {
    name: 'ChatsPage',
    mixins: [
      cookieMixin,
    ],
    components: {
      ChatCard,
      LoadingSpinner,
    },
    data() {
      return {
        loading: false,
        dialogLoading: false,
        dialog: false,
        users: [],
      }
    },

    computed: {
      chats() {
        return this.$store.state.userChats
      }
    },

    methods: {
      getChats() {
        this.loading = true;

        axios({
          method: 'GET',
          url: import.meta.env.VITE_API_LINK + '/chats/',
          headers: {
            'Authorization': 'Bearer ' + this.authToken,
          },
        })
        .then((response) => {
          let chats = response.data.chats;
          this.$store.commit('setUserChats', chats)
        })
        .finally(() => this.loading = false)
      },

      getAllUsers() {
        if (this.users.length === 0) {
          this.dialogLoading = true;

          axios({
            method: 'GET',
            url: import.meta.env.VITE_API_LINK + '/users',
            headers: {
              'Authorization': 'Bearer ' + Cookies.get(import.meta.env.VITE_TOKEN_NAME)
            },
          })
            .then((response) => {
              let users = response.data.users;
              this.users = users;
            })
            .finally(() => this.dialogLoading = false)
        }
      },
    },

    watch: {
      dialog(value) {
        if (value) {
          this.getAllUsers();
        }
      }
    },

    created() {
      if(this.chats.length === 0){
        this.getChats()
      }
    }
  }
</script>

<style>
  .start-new-chat-btn {
    height: 50px!important;
    border-radius: 15px!important;
  }
</style>
