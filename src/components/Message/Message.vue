<template>
  <div>
    <div class="message-container d-flex flex-column align-end">
      <div class="message text-left pl-5 pr-5 pt-2 pb-2 bg-primary">
        <slot name="message-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem impedit repudiandae sequi!
        </slot>
      </div>
      <div class="send-time">
        <span class="sender-name send-time__value font-weight-bold">Крис в </span>
        <span class="send-time__value font-weight-bold">12:13</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
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
