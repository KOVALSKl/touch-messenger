<template>
  <router-view>
    <loading-spinner v-if="loading & !chat"/>
    <div class="chat-container d-flex flex-column w-100 h-100 overflow-y-hidden" style="max-height: 100%" v-else>
      <header class="d-flex justify-space-between align-center w-100 chat-content-border chat-header">
        <div class="avatar">
          <v-avatar color="grey" rounded="0" size="50">
            TS
          </v-avatar>
        </div>
        <h3>{{chat.chat_name}}</h3>
      </header>
      <main class="d-flex flex-column w-100 h-100 overflow-hidden justify-space-between chat-content-border pa-2">
        <div class="messages-container overflow-y-hidden">
          <div class="messages overflow-y-auto">
            <chat-message
              v-for="chat_message in chat.messages"
              :key="chat_message.created_at"
              :message="chat_message"
            >
            </chat-message>
          </div>
        </div>
        <div class="message-form-container">
          <v-form id="message-form">
            <touch-text-field v-model:content="message">
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
  import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
  import ChatMessage from "@/components/Message/Message"
  import SendIcon from "@/components/Icons/SendIcon";
  import TouchTextField from '@/components/TouchTextField/TouchTextField';

  import {Message, MessageType, UserStatus, WebSocketMessage} from "@/lib/classes";
  import {cookieMixin} from '@/lib/mixins'

  export default {
    name: 'Chat',
    props: {
      id: String,
      message: String,
    },
    mixins: [
      cookieMixin,
    ],
    components: {
      LoadingSpinner,
      ChatMessage,
      SendIcon,
      TouchTextField,
    },
    data() {
      return {
        chat: null,
        loading: false,
        message: '',
      }
    },

    computed: {
      socket() {
        return this.$store.state.userWebSocketConnection;
      },

      chatID() {
        return this.$route.params.id;
      }
    },

    methods: {
      getChatContent() {
        this.loading = true;
        axios({
          method: 'GET',
          url: import.meta.env.VITE_API_LINK + `/chats/${this.chatID}`,
          headers: {
            'Authorization':'Bearer ' + this.authToken
          }
        })
        .then((response) => {
          this.chat = response.data
          console.log(response.data)
        })
        .finally(() => this.loading = false)
      },

      sendMessage() {
        this.sendWebsocketMessage(
          MessageType.MESSAGE,
          new Message(
            new Date(),
            this.$store.state.user.login,
            this.message
          )
        )
      },

      sendWebsocketMessage(type, message) {
        if (this.socket) {
          const msg = new WebSocketMessage(
            type,
            {...message}
          )

          const msgJSONString = msg.toJSON()

          this.socket.send(msgJSONString)
        }
      },
    },

    watch: {
      socket(value) {
        if (value) {
          const msg = new WebSocketMessage(
            MessageType.UPDATEUSERSTATUS,
            new UserStatus(
              this.authToken,
              this.chatID,
            )
          )
          const msgJSONString = msg.toJSON()

          value.send(msgJSONString)
        }
      },

      chat(value) {
        if (value) {
          this.$store.commit('setActiveChat', value)
        }
      }
    },

    created() {
      this.getChatContent();
      if (this.socket) {
        this.sendWebsocketMessage(
          MessageType.UPDATEUSERSTATUS,
          new UserStatus(
            this.authToken,
            this.chatID,
          )
        )
      }
    },

    unmounted() {
      if (this.$store.state.activeChat) {
        this.$store.commit('setActiveChat', null)
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
