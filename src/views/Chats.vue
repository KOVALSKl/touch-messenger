<template>
  <router-view>
    <loading-spinner v-if="loading"/>
    <div class="d-flex flex-column" style="gap: 15px;" v-else>
      <chat-card v-for="chat in this.chats" :id="chat.chat_id" :key="chat.chat_id">
        <template #chat-name>
          {{chat.chat_id}}
        </template>
        <template>
          {{chat.created_at}}
        </template>
      </chat-card>
    </div>
  </router-view>
</template>

<script>
  import ChatCard from "@/components/ChatCard/ChatCard";
  import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
  import Cookies from 'js-cookie';
  import axios from 'axios';

  export default {
    name: 'ChatsPage',
    components: {
      ChatCard,
      LoadingSpinner,
    },
    data() {
      return {
        chats: [],
        loading: false,
      }
    },
    methods: {
      getChats() {
        this.loading = true;

        axios({
          method: 'GET',
          url: import.meta.env.VITE_API_LINK + '/chats/',
          headers: {
            'Authorization': 'Bearer ' + Cookies.get(import.meta.env.VITE_TOKEN_NAME)
          },
        })
        .then((response) => this.chats = response.data.chats)
        .finally(() => this.loading = false)
      }
    },
    created() {
      this.getChats();
    }
  }
</script>