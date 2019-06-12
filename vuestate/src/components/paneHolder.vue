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

  export default {
    name: 'PaneHolder',
    // data() {
    //   return {
    //     internalPanes: []
    //   }
    // },
    mixins: [paneBase],
    mounted: function () {
      this.paneType = 'holder'
      this.setBaseDefaults()
      this.setTypeDefaults()
    },
    methods: {
      setTypeDefaults() {
        console.log('i am a holder')
        this.paneAttributes.rotations.perspective = 600
      },
      addPane(){
        console.log('adding pane')
        const payload = {
          holderId: this.id
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
  transition: transform .2s, background .5s, height .2s, width .2s, line-height .2s;
}

.paneHolder.active {
  box-shadow: 0 0 5px 0 rgba(0, 215, 255, 0.8), 0 0 5px 0 rgba(0, 215, 255, 0.8);
}


</style>