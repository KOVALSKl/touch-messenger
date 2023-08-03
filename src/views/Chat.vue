<template>
  <router-view>
    <loading-spinner v-if="loading & !chat"/>
    <div class="chat-container d-flex flex-column w-100 fill-height" v-else>
      <header class="d-flex justify-space-between align-center w-100 chat-content-border chat-header">
        <div class="avatar">
          <v-avatar color="grey" rounded="0" size="50">
            TS
          </v-avatar>
        </div>
        <h3>{{chat.chat_name}}</h3>
      </header>
      <main class="d-flex flex-column w-100 fill-height chat-content-border pa-2">
        <div class="messages h-100">
          <Message></Message>
        </div>
        <div class="message-form-container">
          <v-form id="message-form">
            <touch-text-field>
              <template #append-inner>
                <v-btn
                  color="primary"
                  class="send-message-btn"
                  size="35"
                  variant="text"
                  style="border-radius: 100%"
                  @click="sendMessage"
                >
                  <send-icon/>
                </v-btn>
              </template>
            </touch-text-field>
          </v-form>
        </div>
      </main>
    </div>
  </router-view>
</template>

<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
  import SendIcon from "@/components/Icons/SendIcon";
  import Message from '@/components/Message/Message'
  import TouchTextField from '@/components/TouchTextField/TouchTextField';

  export default {
    name: 'Chat',
    props: {
      id: String
    },
    components: {
      LoadingSpinner,
      Message,
      SendIcon,
      TouchTextField,
    },
    data() {
      return {
        socket: null,
        chat: null,
        loading: false,
      }
    },
    methods: {
      getChatContent() {
        this.loading = true;
        console.log(this.$route)
        axios({
          method: 'GET',
          url: import.meta.env.VITE_API_LINK + `/chats/${this.$route.params.id}`,
          headers: {
            'Authorization':'Bearer ' + Cookies.get(import.meta.env.VITE_TOKEN_NAME)
          }
        })
        .then((response) => this.chat = response.data)
        .finally(() => this.loading = false)
      },

      sendMessage() {
        this.socket?.send({
          type: 0,
          message: this.message,
          auth_token: Cookies.get(import.meta.env.VITE_TOKEN_NAME)
        })
      },
    },

    created() {
      this.getChatContent();
      this.socket = new WebSocket(
        `wss://${import.meta.env.VITE_API_LINK_PAYLOAD}/chats/${this.$route.params.id}/ws/message?auth_token=${Cookies.get(import.meta.env.VITE_TOKEN_NAME)}`
      )
      this.socket.onerror = (err) => {
        console.log(err)
      }

      this.socket.onmessage = (message) => {
        console.log(message)
      }
    }
  }
</script>

<style>
  .avatar {
    border-radius: 20px;
    overflow: hidden;
  }

  .chat-content-border {
    border-radius: 20px;
    border: 3px solid rgba(0,0,0, 0.1)
  }

  .chat-header {
    padding: 5px 17px 5px 5px;
  }

  .chat-container {
    gap: 10px;
  }

  #message-form__text-field .v-input__slot {
    border-radius: 20px;
  }

</style>
