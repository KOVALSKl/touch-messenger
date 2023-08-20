<template>
  <router-view />
</template>

<script>
  import Cookies from "js-cookie";
  import jwtDecode from "jwt-decode";
  import {Message, MessageType, WebSocketMessage} from "@/lib/classes";
  import moment from "moment";

  export default {
    name: 'App',
    components: {},
    computed: {
      userLoggedIn() {
        return this.$store.state.isLoggedIn;
      },

      userChats() {
        return this.$store.state.userChats;
      },

      activeChat() {
        return this.$store.state.activeChat;
      },

      user() {
        return this.$store.state.user;
      },

      userConnection() {
        return this.$store.state.userWebSocketConnection;
      },
    },
    methods: {
      createConnection() {
        let token = Cookies.get(import.meta.env.VITE_TOKEN_NAME)
        const userConnection = new WebSocket(
          `ws://${import.meta.env.VITE_API_LINK_PAYLOAD}/communication/ws?auth_token=${token}`
        )

        userConnection.onopen = () => {
          this.$store.commit(
            'setUserConnection',
            userConnection
          )
        }

        userConnection.onerror = (err) => {
          console.log(err)
        }

        userConnection.onmessage = (response) => {
          const responseMessage = JSON.parse(response.data)
          const messageModelType = responseMessage.message.type
          const messageModelContent = responseMessage.message.content

          switch (messageModelType) {
            case 0:
              if (this.activeChat && this.activeChat.id == responseMessage.chat_id) {
                this.activeChat.messages.push(messageModelContent)
              } else {
                const chatModel = this.getChatByID(responseMessage.chat_id)
                if (chatModel.unread) {
                  chatModel.unread++;
                } else {
                  chatModel.unread = 1;
                }
              }
              break;
            case 2:
              console.log(messageModelContent)
              this.$store.commit('addUserChat', messageModelContent);
              break;
          }
          this.$store.commit('setIsMessageSending', false);
        }

        userConnection.onclose = () => {
          this.$store.commit(
            'setUserConnection',
            null
          )
        }
      },

      getChatByID(chatID) {
        for(let i=0; i < this.userChats.length; i++) {
          if (this.userChats[i].chat_id === chatID)
            return this.userChats[i]
        }
        return null
      },

      getUserFromToken() {
        let token = Cookies.get(import.meta.env.VITE_TOKEN_NAME)
        const userModel = jwtDecode(token)

        this.$store.commit('setUser', userModel);
      }
    },

    watch: {
      userLoggedIn(userStatus) {
        if (userStatus) {
          this.createConnection()
          this.getUserFromToken()
        }
      },

      activeChat(model) {
        if (model) {
          const activeChatMetaModel = this.getChatByID(model.id)
          activeChatMetaModel.unread = 0;
        }
      }
    },
    mounted() {
    },
  }
</script>
