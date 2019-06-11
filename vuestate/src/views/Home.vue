<template>
  <div>
    <div id="masterHolder">
      <controller/>
      <button v-on:click="addPaneHolder">
        +
      </button>
      <paneHolder v-for="(paneHolder, index) in $store.state.paneHolders" :key="index" :id="paneHolder.id" :paneAttributes="paneHolder.paneAttributes" paneType="holder">
        <pane v-for="(pane, index) in paneHolder.internalPanes" :id="pane.id" :key="index" :paneAttributes="pane.paneAttributes"/>
      </paneHolder>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import paneHolder from '@/components/paneHolder.vue'
import pane from '@/components/pane.vue'
import controller from '@/components/controller.vue'

export default {
  name: 'home',
  components: {
    paneHolder,
    pane,
    controller
  },
  methods: {
    addPaneHolder: function () {
      console.log('adding')
      const attributes =  {
        rotations: {
          x: 0,
          y: 0,
          z: 0,
          spin: 0,
          perspective: 600
        },
        size: {
          height: 500,
          width: 500
        },
        position: {
          top: 0,
          left: 0
        },
        colors: {
          red: 250,
          green: 250,
          blue: 255,
          opacity: 1
        }
      }
      this.$store.commit('addPaneHolder', attributes)
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
