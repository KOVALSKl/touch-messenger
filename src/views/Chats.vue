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
      <v-dialog class="backdrop-blur-sm" v-model="dialog" style="">
        <template #activator="{ props }">
          <v-btn
            class="start-new-chat-btn bg-primary"
            v-bind="props"
          >
            начать новый чат
          </v-btn>
        </template>

        <div class="w-100 d-flex align-center justify-center">
          <v-card
            class="w-100"
            min-height="270"
            min-width="340"
            max-width="340"
            style="border-radius: 15px;"
          >
            <v-card-title class="font-weight-bold text-center">Начать общение</v-card-title>
            <v-card-text class="h-100">
              <loading-spinner class="position-relative" v-if="dialogLoading"/>
              <div class="users d-flex flex-column" style="gap:10px;" v-else>
                <v-autocomplete
                  :disabled="dialogLoading"
                  v-model="chosenUsers"
                  :items="users"
                  item-value="login"
                  item-title="name"
                  label="Пользователи"
                  variant="outlined"
                  chips
                  closable-chips
                  multiple
                >
                  <template #item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :title="item?.raw?.name + ' ' + item?.raw?.surname"
                    >
                    </v-list-item>
                  </template>
                </v-autocomplete>
                <v-text-field
                  :disabled="isDialog"
                  v-model="name"
                  label="Название чата"
                  variant="outlined"
                  placeholder="Пингвины"
                  hide-details
                  clearable
                >
                </v-text-field>
              </div>
            </v-card-text>
            <v-card-actions v-if="!dialogLoading">
              <v-spacer/>
              <v-btn
                color="error"
                @click="dialog = false"
              >
                Закрыть
              </v-btn>
              <v-btn
                :disabled="chosenUsers.length === 0"
                color="primary"
                @click="createChat"
              >
                Создать
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
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
        chosenUsers: [],
        name,
      }
    },

    computed: {
      chats() {
        return this.$store.state.userChats
      },

      isDialog() {
        return this.chosenUsers.length <= 1
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

      createChat() {
        if (this.chosenUsers.length === 0)
          return;
        else if (this.chosenUsers.length > 1) {
          if (this.name === '') return;
        }

        this.dialog = false;
        this.loading = true;

        axios({
          method: 'POST',
          url: import.meta.env.VITE_API_LINK + '/chats/',
          headers: {
            'Authorization': 'Bearer ' + Cookies.get(import.meta.env.VITE_TOKEN_NAME)
          },
          data: {
            members_login: this.chosenUsers,
            name: this.name
          }
        })
        .then((response) => {
          console.log(response.data)
          this.$store.commit('addUserChat', response.data)
        })
        .finally(() => this.loading = false)
      }
    },

    watch: {
      dialog(value) {
        if (value) {
          this.getAllUsers();
        }
      },

    },

    created() {
      if(this.chats.length === 0){
        this.getChats()
      }
    }
  }
</script>

<style>
  .backdrop-blur-sm {
    backdrop-filter: blur(3px)
  }

  .start-new-chat-btn {
    height: 50px!important;
    border-radius: 15px!important;
  }
</style>
