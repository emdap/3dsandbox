<template>
    <div :id="id" :style="paneStyle" :class="['paneHolder', id == $store.state.activePaneHolder.id ? 'active' : 'default']">
      <div class='addPane' v-on:click="addPane">
        +
      </div>
      {{id}}
      <slot></slot>
    </div>
</template>

<script>
import paneBase from '@/components/paneBase.vue'
import pane from '@/components/pane.vue'

  export default {
    components: {
      pane
    },
    data() {
      return {
        // internalPanes: []
      }
    },
    mixins: [paneBase],
    mounted: function () {
      this.setBaseDefaults()
      this.setTypeDefaults()
      this.updateActive(false)
    },
    methods: {
      setTypeDefaults() {
        console.log('i am a holder')
        this.paneAttributes.paneType = 'holder'
        this.paneAttributes.rotations.perspective = 600
      },
      addPane(customAtts=false){
        console.log('adding pane')
        const payload = {
          attributes: {
            rotations: {
              x: 0,
              y: 0,
              z: 100,
              spin: 0,
              perspective: 0
            },
            size: {
              height: 100,
              width: 100
            },
            position: {
              top: 0,
              left: 0
            },
            colors: {
              red: 255,
              green: 200,
              blue: 150,
              opacity: .9
            }
          }
        }
        this.$store.commit('addPane', payload)
        // this.internalPanes.push(pane)
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
  position: absolute;
  color: black !important;
  border: 1px solid black !important;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  overflow: visible !important;
}

.paneHolder.active {
  box-shadow: 0 0 5px 0 rgba(0, 215, 255, 0.8), 0 0 5px 0 rgba(0, 215, 255, 0.8);
}


</style>