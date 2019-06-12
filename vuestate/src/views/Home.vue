<template>
  <div>
    <div id="masterHolder">
      <controller/>
      <paneHolder v-for="paneHolder in $store.state.paneHolders" :key="paneHolder.id" :id="paneHolder.id" :customAtts="paneHolder.customAtts" paneType="holder">
        <pane v-for="pane in paneHolder.internalPanes" :id="pane.id" :key="pane.id" :holderId="pane.holderId" :customAtts="pane.customAtts"/>
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
