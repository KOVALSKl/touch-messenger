<template>
  <router-view>
    {{$route.params.id}}
  </router-view>
</template>

<script>
  export default {
    name: 'Chat',
    props: {
      id: String
    },
    components: {},
    data() {
      return {

      }
    }
  }
</script>

<style>

</style>
