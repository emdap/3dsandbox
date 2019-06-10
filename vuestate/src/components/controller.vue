<template>
  <div>
    {{paneAtts}}
  </div>
</template>

<script>
  export default {
    computed: {
      paneAtts: function () {
        return this.$store.state.activePane.paneAttributes
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>