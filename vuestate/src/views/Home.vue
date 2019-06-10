<template>
  <div>
    <div id="masterHolder">
      <controller/>
      <button v-on:click="addPaneHolder">
        +
      </button>
      <paneHolder v-for="(paneHolder, index) in $store.state.paneHolders" :key="index" :id="paneHolder.id" paneType="holder"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import paneHolder from '@/components/paneHolder.vue'
import controller from '@/components/controller.vue'

export default {
  name: 'home',
  components: {
    paneHolder,
    controller
  },
  mounted: function() {
    // document.addEventListener('keydown', this.$store.commit('updateKeyDown', true))
    // document.addEventListener('keyup', this.$store.commit('updateKeyDown', false))
    // document.addEventListener('mousemove', function(e) {
    //   if ($store.state.mouseDown) {
    //     e.preventDefault()
    //     mousePos = {
    //       x: e.clientX,
    //       y: e.clientY
    //     }
    //     $store.state.commit('updateMousePos', mousePos)
    //   }
    // })
  },
  methods: {
    addPaneHolder: function () {
      console.log('adding')
      // const pane = {
      //   id: this.$store.state.panes.length + 1,
      //   holderId: 1
      // }
      const paneHolder = {
        id: `holder${this.$store.state.paneHolders.length + 1}`,
        internalPanes: []
      }
      this.$store.commit('addPaneHolder', paneHolder)
    }
  }
}
</script>

<style scoped>
#masterHolder {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  /* border: 1px solid black; */
}
</style>
