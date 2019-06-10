<template>
    <div :id="`paneHolder${id}`" :style="paneStyle" :class="['paneHolder', id == $store.state.activePane.id ? 'active' : 'default']">
      <div class='addPane' v-on:click="addPane">
        +
      </div>
      {{id}}
      <pane v-for="(pane, index) in internalPanes" :id="pane.id" :key="index"/>
    </div>
</template>

<script>
import paneBase from '@/components/paneBase.vue'
import pane from '@/components/pane.vue'

  export default {
    components: {
      pane
    },
    mixins: [paneBase],
    mounted: function () {
      this.setTypeDefaults()
      this.div = document.getElementById(`paneHolder${this.id}`)
      this.setBaseDefaults()
    },
    methods: {
      setTypeDefaults() {
        console.log('i am a holder')
        this.paneAttributes.size = {
          height: 500,
          width: 500
        }      
        this.paneAttributes.colors = {
          red: 250,
          green: 250,
          blue: 255,
          opacity: 1
        }
        this.paneAttributes.rotations.perspective = 600
      },
      addPane(e){
        console.log('adding pane')
        const pane = {
          holderId: this.id,
          id: `pane${this.$store.state.panes.length + 1}`
        }
        this.$store.commit('addPane', pane)
        this.internalPanes.push(pane)
      }
    }
  }
</script>

<style scoped>

.addPane {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: black !important;
  font-size: 1rem;
  width: 1rem;
  line-height: 1rem !important;
}

.paneHolder {
  color: black !important;
  border: 1px solid black !important;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  overflow: visible !important;
}
</style>