<template>
  <div class="spinner-window position-absolute d-flex align-center justify-center">
    <v-progress-circular color="primary" size="large" width="5" indeterminate/>
  </div>
</template>

<script>
  export default {
    name: 'LoadingSpinner',
    components: {},
    data() {
      return {

      }
    }
  }
</script>

<style>
  .spinner-window {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
