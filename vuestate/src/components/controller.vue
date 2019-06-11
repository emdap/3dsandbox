<template>
  <div>
    <table>
      HOLDER CONTROL
      <tr>
        <th>field</th>
        <th>value</th>
        <th>new</th>
      </tr>
      <tr v-for="(att, index) in $store.state.activePaneHolder.attributes" :key="index">
        <td>
          {{att}}
        </td>        
      </tr>
    </table>
    <table>
      PANE CONTROL
      <tr>
        <th>field</th>
        <th>value</th>
        <th>new</th>
      </tr>
      <tr v-for="(att, index) in $store.state.activePane.attributes" :key="index">
        <td>
          {{att}}
        </td>        
      </tr>
    </table>
    <input v-model="updated">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        updated: ''
      }
    },
    watch: {
      updated: function () {
        console.log(this.updated)
        console.log(this.$store.state.activePaneHolder.attributes.size.height)
        const curH = this.$store.state.activePaneHolder.attributes.size.height
        const curW = this.$store.state.activePaneHolder.attributes.size.width
        this.$store.state.activePaneHolder.methods.updateSize(curH + this.updated * 1, curW)
      }
    },
    computed: {
      paneAtts: function () {
        return this.$store.state.activePane
      }
    }
  }
</script>

<style scoped>

</style>