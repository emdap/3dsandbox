<template>
  <div :id="id" :style="paneStyle" :class="id == $store.state.activePane.id ? 'active' : 'default'">
    {{id}}
  </div>
</template>

<script>
import paneBase from '@/components/paneBase.vue'
export default {
  name: 'Pane',
  mixins: [paneBase],
  mounted: function() {
    this.setBaseDefaults()
    this.setTypeDefaults()
    this.setColors()
  },
  methods: {
    setTypeDefaults() {
      this.paneAttributes.paneType = 'pane'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  position: absolute;
  color: white;
  font-weight: bolder;
}

.active {
  box-shadow: 0 0 5px 0 rgba(255, 215, 0, 0.8), 0 0 5px 0 rgba(255, 215, 0, 0.8);
}
</style>
