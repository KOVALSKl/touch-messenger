<template>
  <v-text-field
    v-bind="$props"
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="fieldType"
    @click:appendInner="show = !show"
    @focusout="show = false"
  />
</template>

<script>
  export default {
    name: 'PasswordField',
    data() {
      return {
        show: false,
      }
    },

    computed: {
      fieldType() {
        return this.show ? 'text' : 'password';
      }
    }
  }
</script>

<style>

</style>
