<template>
  <div v-if="message">
    <div
      class="message-container w-auto d-flex flex-column"
      :class="isMine ? 'mine' : 'alien'"
    >
      <div
        class="message d-flex justify-end pl-5 pr-5 pt-2 pb-2 text-white"
        :class="isMine ? 'mine' : 'alien'"
      >
        <span>
           <slot name="message-text">
              {{message.content}}
            </slot>
        </span>
      </div>
      <div class="send-time mr-1 ml-1">
        <span class="sender-name send-time__value font-weight-bold">{{message.creator_login}} &nbsp;</span>
        <span class="send-time__value font-weight-bold">{{sendMessageTime}}</span>
      </div>
    </div>
  </div>
<!--  можно добавить скелетона -->
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'ChatMessage',
    props: {
      message: null,
    },
    components: {},
    data() {
      return {

      }
    },
    computed: {
      sendMessageTime() {
        if (this.message) {
          return moment(this.message.created_at, 'DD.MM.YYYY HH:mm:ss').format('HH:mm')
        }
        return null
      },

      isMine() {
        return this.message.creator_login === this.$store.state.user.login
      }
    },
    methods: {}
  }
</script>

<style>
  .message-container.mine {
    align-items: flex-end;
  }

  .message.mine {
    background-color: var(--primary-color);
  }

  .message-container.alien {
    align-items: flex-start;
  }

  .message.alien {
    background-color: var(--alien-message-color);
  }

  .message {
    font-size: 14px;
    border-radius: 15px 15px 15px 15px;
  }

  .send-time__value {
    font-size: 12px;
  }
</style>
