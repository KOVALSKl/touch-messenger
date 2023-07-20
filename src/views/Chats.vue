<template>
  <router-view>
    <div class="d-flex">
      <chat-card>
      </chat-card>
    </div>
  </router-view>
</template>

<script>
  import ChatCard from "@/components/ChatCard/ChatCard";

  export default {
    name: 'ChatsPage',
    components: {
      ChatCard
    },
    data() {
      return {

      }
    }
  }
</script>
