<template>
  <router-link :to="`chats/${this.id}`" class="text-decoration-none">
    <v-card
      elevation="0"
      class="bg-card-bg d-flex chat-card"
      style="gap: 10px;"
      min-width="340"
    >
      <div class="avatar">
        <v-avatar color="black" rounded="0" size="60">
          TS
        </v-avatar>
      </div>

      <div class="content d-flex flex-column justify-center" style="gap: 5px;">
        <div class="chat-name">
          <slot name="chat-name">
          <span class="font-weight-medium">
            Travis Scott
          </span>
          </slot>
        </div>

        <div class="last-message">
          <slot name="last-message">
            this is the last message
          </slot>
        </div>
      </div>
    </v-card>
  </router-link>
</template>

<script>
  export default {
    name: 'ChatCard',
    props: {
      id: String,
    },
    components: {},
    data() {
      return {

      }
    },

  }
</script>

<style>
  .chat-card {
    padding: 5px 17px 5px 5px !important;
    border-radius: 20px !important;
  }

  .avatar {
    border-radius: 20px;
    overflow: hidden;
  }
</style>
