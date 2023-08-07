<template>
  <div v-if="message">
    <div class="message-container d-flex flex-column align-end">
      <div class="message text-left pl-5 pr-5 pt-2 pb-2 bg-primary">
        <slot name="message-text">
          {{message.content}}
        </slot>
      </div>
      <div class="send-time">
        <span class="sender-name send-time__value font-weight-bold">{{message.creator_login}} &nbsp;</span>
        <span class="send-time__value font-weight-bold">{{message.created_at}}</span>
      </div>
    </div>
  </div>
<!--  можно добавить скелетона -->
</template>

<script>
  export default {
    name: 'ChatMessage',
    props: {
      message: null,
      isMine: false,
    },
    components: {},
    data() {
      return {

      }
    },
    methods: {}
  }
</script>

<style>
  .message {
    font-size: 14px;
    border-radius: 20px 20px 0 20px;
  }

  .send-time__value {
    font-size: 12px;
  }
</style>
