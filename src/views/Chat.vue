<template>
  <router-view>
    <loading-spinner v-if="!chat || loading || isAutoScrolling || !messages"/>
    <div class="d-flex flex-column justify-space-between fill-height overflow-hidden chat-container">
      <router-link
        class="position-absolute text-decoration-none text-black"
        to="/chats"
        style="left: 30px; top: 25px;"
      >
            <span class="d-flex align-center">
              <span class="mdi mdi-menu-left text-h5"></span>
              <h5 class="font-weight-bold" style="margin-left: -5px; margin-top: -1px;">Чаты</h5>
            </span>
      </router-link>
      <header class="d-flex justify-space-between align-center w-100 chat-content-border chat-header">
        <div class="avatar">
          <v-avatar color="grey" rounded="0" size="50">
            TS
          </v-avatar>
        </div>
        <div class="chat-name-container d-flex flex-column align-center justify-center">
          <h3 class="chat-name">{{chat?.chat_name}}</h3>
          <h6 class="text-success" v-if="chat?.chat_name">Активен</h6>
        </div>
        <div class="d-flex align-center justify-space-between">
          <router-link class="d-flex align-center" to="/settings">
            <settings-icon/>
          </router-link>
        </div>
      </header>
      <main class="overflow-y-auto" id="messages-container">
        <div class="messages" id="messages">
          <chat-message
            v-for="chat_message in messages"
            :key="chat_message.created_at"
            :message="chat_message"
          >
          </chat-message>
        </div>
      </main>
      <footer>
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
                  :loading="isMessageSending"
                  @click="sendMessage"
                >
                  <send-icon/>
                </v-btn>
              </template>
            </touch-text-field>
          </v-form>
        </div>
      </footer>
    </div>
  </router-view>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
  import ChatMessage from "@/components/Message/Message"
  import SendIcon from "@/components/Icons/SendIcon";
  import SettingsIcon from "@/components/Icons/SettingsIcon";
  import FriendsIcon from "@/components/Icons/FriendsIcon";
  import TouchTextField from '@/components/TouchTextField/TouchTextField';

  import {Message, MessageType, UserStatus, WebSocketMessage} from "@/lib/classes";
  import {cookieMixin} from '@/lib/mixins';
  import FriendIcon from "@/components/Icons/FriendsIcon";

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
      FriendIcon,
      LoadingSpinner,
      ChatMessage,
      SendIcon,
      SettingsIcon,
      FriendsIcon,
      TouchTextField,
    },
    data() {
      return {
        chat: null,
        loading: false,
        isAutoScrolling: false,
        message: '',
      }
    },

    computed: {

      messages() {
        if (this.chat)
          return this.chat.messages
        return null
      },

      socket() {
        return this.$store.state.userWebSocketConnection;
      },

      chatID() {
        return this.$route.params.id;
      },

      isMessageSending() {
        return this.$store.state.isMessageSending;
      },

      messagesContainer() {
        return document.getElementById('messages-container');
      },
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
        })
        .finally(() => this.loading = false)
      },

      sendMessage() {
        this.$store.commit('setIsMessageSending', true);

        this.sendWebsocketMessage(
          MessageType.MESSAGE,
          new Message(
            moment().format('DD.MM.YYYY HH:mm:ss'),
            this.$store.state.user.login,
            this.message
          )
        )
        this.message = '';
      },

      scrollDown() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        this.isAutoScrolling = false;
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
          console.log(value)
          this.$store.commit('setActiveChat', {
            id: this.chatID,
            ...value
          })
        }
      },

      loading(value) {
        if (!value) {
          this.isAutoScrolling = true;
          this.scrollDown();
        }
      },

      messages: {
        handler(value) {
          if (value && value.length > 0) {
            setTimeout(
              this.scrollDown,
              100
            )
          }
        },
        deep: true
      },
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

      if (this.isMessageSending) {
        // СОХРАНИТЬ СООБЩЕНИЯ В СТАТУСЕ ОТПРАВКИ
        this.$store.commit('setIsMessageSending', false);
      }
    }
  }
</script>

<style scoped>
  .avatar {
    width: initial;
    height: initial;
    border-radius: 20px;
    overflow: hidden;
  }

  .chat-content-border {
    border-radius: 20px;
    border: 2px solid rgba(0,0,0, 0.1);
  }

  .chat-header {
    padding: 5px 17px 5px 5px;
  }

  .chat-container {
    gap: 10px;
  }

  .chat-name {
    font-family: Montserrat Alternates;
  }

  #message-form__text-field .v-input__slot {
    border-radius: 20px;
  }

  #messages-container::-webkit-scrollbar {
    width: 0;
  }

</style>
