<template>
  <div :id="`pane${id}`" :style="paneStyle" :class="id == $store.state.activePane.id ? 'active' : 'default'">
    {{id}}
  </div>
</template>

<script>
import paneBase from '@/components/paneBase.vue'
export default {
  name: 'Pane',
  mixins: [paneBase],
  mounted: function() {
    this.setTypeDefaults()
    this.setBackgrounds()
    this.div = document.getElementById(`pane${this.id}`)
    this.setBaseDefaults()
  },
  methods: {
    setTypeDefaults() {
      this.paneAttributes.size = {
        height: 100,
        width: 100
      }
      this.paneAttributes.colors = {
        red: 255,
        green: 200,
        blue: 150,
        opacity: .9
      }
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
