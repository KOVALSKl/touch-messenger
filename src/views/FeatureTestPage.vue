<template>
  <router-view>
    <touch-text-field></touch-text-field>
  </router-view>
</template>

<script>
  import TouchTextField from "@/components/TouchTextField/TouchTextField.vue";
  export default {
    name: 'FeatureTestPage',
    components: {
      TouchTextField
    }
  }
</script>

<style>

</style>
