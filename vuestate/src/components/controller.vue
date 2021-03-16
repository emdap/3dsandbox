<template>
  <div id="controller">
    <button id="adder" v-on:click="addPaneHolder">
      Add Pane Holder
    </button>
    <button id="adder" v-on:click="addHouse" v-if="$store.state.activePaneHolder">
      Add House
    </button>
    <div id="holderControls" class="controlHolder" v-if="$store.state.activePaneHolder">
      <div class="controlHeader">
        {{$store.state.activePaneHolder.id}} CONTROL
      </div>
      <button class="duplicate" v-on:click="duplicateHolder">duplicate</button>
      <button class="duplicate" v-on:click="updateSpin('holder')">spin</button>
      <button class="showControls" v-on:click="showHolderControls = !showHolderControls">
        {{showHolderControls ? "hide controls" : "show controls"}}
      </button>
      <controlTable v-if="showHolderControls" paneType="holder"/>
    </div>

    <div id="paneControls" class="controllHolder" v-if="$store.state.activePane">
      <div class="controlHeader">
        {{$store.state.activePane.id}} CONTROL
      </div>
      <button class="duplicate" v-on:click="duplicatePane">duplicate</button>
      <button class="duplicate" v-on:click="updateSpin('pane')">spin</button>
      <button class="showControls" v-on:click="showPaneControls = !showPaneControls">
        {{showPaneControls ? "hide controls" : "show controls"}}
      </button>
      <controlTable v-if="showPaneControls" paneType="pane"/>
    </div>
  </div>
</template>

<script>
import controlTable from '@/components/controlTable'
import {house} from '@/defaults.js'

  export default {
    name: 'Controller',
    components: {
      controlTable
    },
    data() {
      return {
        showHolderControls: false,
        showPaneControls: false, 
      }
    },
    methods: {
      makeTargets(paneType, attribute){
        let targetOld, targetMethods
        if (paneType == 'holder') {
          targetOld =  this.$store.state.activePaneHolder.attributes[attribute]
          targetMethods = this.$store.state.activePaneHolder.methods
        } else if (paneType == 'pane') {
          targetOld =  this.$store.state.activePane.attributes[attribute]
          targetMethods = this.$store.state.activePane.methods
        } 
        return {targetOld, targetMethods}
      },
      makeNewVals(targetNew, targetOld, which, operation) {
        let newVals = {}
        for (let key in targetNew) {
          if (key == which || which == 'all') {
            if (operation == 'inc') {
              newVals[key] = targetOld[key] * 1 + targetNew[key] * 1
            } else if (operation == 'dec') {
              newVals[key] = targetOld[key] * 1 - targetNew[key] * 1
            } else {
              newVals[key] = targetNew[key] * 1
            }
          } else {
            newVals[key] = targetOld[key] * 1
          }
        }
        return newVals
      },
      updateRotation(paneType, operation, which, targetNew) {
        const {targetOld, targetMethods} = this.makeTargets(paneType, 'rotations')
        const newVals = this.makeNewVals(targetNew, targetOld, which, operation)
        targetMethods.updateRotation(newVals.x, newVals.y, newVals.z, newVals.spin, newVals.perspective)
      },
      updateSize(paneType, operation, which, targetNew) {
        const {targetOld, targetMethods} = this.makeTargets(paneType, 'size')
        const newVals = this.makeNewVals(targetNew, targetOld, which, operation)
        targetMethods.updateSize(newVals.height, newVals.width)
      },
      updatePosition(paneType, operation, which, targetNew) {
        const {targetOld, targetMethods} = this.makeTargets(paneType, 'position')
        const newVals = this.makeNewVals(targetNew, targetOld, which, operation)
        targetMethods.updatePosition(newVals.top, newVals.left, newVals.zIndex)
      },
      updateColor(paneType, operation, which, targetNew) {
        const {targetOld, targetMethods} = this.makeTargets(paneType, 'colors')
        const newVals = this.makeNewVals(targetNew, targetOld, which, operation)
        targetMethods.updateColor(newVals.red, newVals.green, newVals.blue, newVals.opacity)
      },
      duplicateHolder(){
        this.$store.dispatch('duplicateHolder', this.$store.state.activePaneHolder)
      },
      duplicatePane() {
        this.$store.dispatch('duplicatePane', this.$store.state.activePane)
      },
      addPaneHolder: function () {
        const customAtts = false
        this.$store.commit('addPaneHolder', customAtts)
      },
      updateSpin: function (paneType) {
        const {targetMethods} = this.makeTargets(paneType, 'rotations')
        targetMethods.updateSpin()
      },
      addHouse: function() {
        const curHolder = this.$store.state.activePaneHolder.id
        console.log(curHolder)
        console.log(house)
        house.forEach(atts => {
          console.log(atts)
          let payload = {
            holderId: curHolder,
            customAtts: atts
          }
          this.$store.commit('addPane', payload)
        })
      }
    }
  }
</script>

<style scoped>
#controller {
  opacity: .8;
  z-index: 9999;
  width: 350px;
  position: absolute;
  padding: 10px;
  background: rgba(255, 250, 255, .8);
  border: 1px solid grey;
}
#adder {
  /* float: left; */
  /* position: absolute; */
  display: block;
  margin-bottom: 10px;
}
.controlHeader {
  float: left;
}

.duplicate {
  float: right;
}

.showControls {
  float: right;
}

#holderControls {
  min-height: 2rem;
  margin-bottom: 10px;
}

</style>