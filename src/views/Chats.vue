<template>
  <router-view>
    <chat-card>
    </chat-card>
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
