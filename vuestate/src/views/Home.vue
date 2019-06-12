<template>
  <div>
    <div id="masterHolder">
      <controller/>
      <paneHolder v-for="(paneHolder, index) in $store.state.paneHolders" :key="index" :id="paneHolder.id" :customAtts="paneHolder.customAtts" paneType="holder">
        <pane v-for="(pane, index) in paneHolder.internalPanes" :id="pane.id" :key="index" :holderId="pane.holderId" :customAtts="pane.customAtts"/>
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
  name: 'Home',
  components: {
    paneHolder,
    pane,
    controller
  },
  methods: {
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

.adder {
  float: left;
}
</style>
