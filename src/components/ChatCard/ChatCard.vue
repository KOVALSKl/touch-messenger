<template>
  <router-link :to="`/chats/${this.id}`" class="text-decoration-none">
    <v-card
      elevation="0"
      class="bg-card-bg d-flex align-center justify-space-between chat-card"
      min-width="320"
      height="70"
    >
      <div class="chat-card-content d-flex align-center h-100 w-100" style="gap: 10px;">
        <div class="avatar">
          <v-avatar
            class="w-100"
            color="black"
            rounded="0"
            size="60"
          >
            <v-icon color="white">
              mdi mdi-alert-circle-outline
            </v-icon>
          </v-avatar>
        </div>
        <div class="d-flex flex-column justify-center w-100 overflow-hidden" style="gap: 5px;">
          <div class="chat-name">
            <slot name="chat-name"></slot>
          </div>

          <div class="last-message-container">
              <span class="last-message" v-if="last_message && user?.login">
                {{
                  (last_message.creator_login === user.login)
                    ? `Вы: ${last_message.content}`
                    : `${last_message.content}`
                }}
              </span>
          </div>
        </div>

        <span class="badge" v-if="unreadMessagesCount">
          {{unreadMessagesCount}}
        </span>
      </div>
    </v-card>
  </router-link>
</template>

<script>
  export default {
    name: 'ChatCard',
    props: {
      id: String,
      chatName: String,
      last_message: Object,
      unreadMessagesCount: {
        type: Number,
        default: () => 0,
      },
    },
    components: {},
    computed: {
      user() {
        return this.$store.state.user;
      }
    }
  }
</script>

<style scoped>
  .chat-card {
    padding: 5px 15px 5px 5px !important;
    border-radius: 20px !important;
  }

  .avatar {
    width: 75px;
    height: 60px;
    border-radius: 17px;
    overflow: hidden;
  }

  .badge {
    font-size: 12px;
    padding: 1px 8px;
    border-radius: 100px;

    color: #ffffff;
    background-color: var(--primary-color);
  }

  .last-message-container {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .last-message {
    height: 19px;

    text-overflow: ellipsis;
  }
</style>
