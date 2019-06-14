<template>
  <div :id="id" :style="paneStyle" :class="['pane', id == $store.state.activePane.id ? 'active' : 'default', this.spinning ? 'spinning': '']">
      <div class='removePane' v-on:click="removePane">
        -
      </div>
      {{id}}
      <div class='addSpin' v-on:click="spinning = !spinning">
        ~
      </div>
  </div>
</template>

<script>
import paneBase from '@/components/paneBase.vue'
export default {
  name: 'Pane',
  // data() {
  //   return {
  //     holderId: 0
  //   }
  // },
  mixins: [paneBase],
  mounted: function() {
    this.paneType = 'pane'
    this.setBaseDefaults()
    this.setTypeDefaults()
  },
  methods: {
    setTypeDefaults() {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pane{
  position: absolute;
  color: white;
  font-weight: bolder;
  transition:  transform .2s, background .5s, height .2s, width .2s;
}

.pane.active {
  box-shadow: 0 0 5px 0 rgba(255, 215, 0, 0.8), 0 0 5px 0 rgba(255, 215, 0, 0.8);
}
</style>
