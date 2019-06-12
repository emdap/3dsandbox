<template>
  <div id="controller">
    <button id="adder" v-on:click="addPaneHolder">
      Add Pane Holder
    </button>
    <div id="holderControls" class="controlHolder" v-if="$store.state.activePaneHolder">
      <div class="controlHeader">
        {{$store.state.activePaneHolder.id}} CONTROL
      </div>
      <button class="duplicate" v-on:click="duplicateHolder">duplicate</button>
      <button class="showControls" v-on:click="showHolderControls = !showHolderControls">
        {{showHolderControls ? "hide holder controls" : "show holder controls"}}
      </button>
      <controlTable v-if="showHolderControls" paneType="holder"/>
    <!-- <table v-if="showHolderControls">
      <tr>
        <th>field</th>
        <th>value</th>
        <th>new</th>
        <th>inc</th>
        <th>set</th>
      </tr>
      <tr v-for="(value, key) in holderVals.attributes.rotations" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newHolderRotation[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateRotation('holder', item, key, newHolderRotation)">
            +
          </button>
        </td>
      </tr>
      <tr v-for="(value, key) in holderVals.attributes.size" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newHolderSize[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateSize('holder', item, key, newHolderSize)">
            +
          </button>
        </td>
      </tr>
       <tr v-for="(value, key) in holderVals.attributes.position" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newHolderPosition[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updatePosition('holder', item, key, newHolderPosition)">
            +
          </button>
        </td>
      </tr>
       <tr v-for="(value, key) in holderVals.attributes.colors" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newHolderColor[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateColor('holder', item, key, newHolderColor)">
            +
          </button>
        </td>
      </tr>
        <td>z index</td>
        <td>{{holderVals.attributes.zIndex}}</td>
        <td>
          <input v-model="newHolderZIndex"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateZIndex('holder', item)">
            +
          </button>
        </td>
      </tr>
    </table> -->
    </div>

    <div id="paneControls" class="controllHolder" v-if="$store.state.activePane">
      <div class="controlHeader">
        {{$store.state.activePane.id}} CONTROL
      </div>
      <button class="duplicate" v-on:click="duplicatePane">duplicate</button>
      <button class="showControls" v-on:click="showPaneControls = !showPaneControls">
        {{showPaneControls ? "hide pane controls" : "show pane controls"}}
      </button>
      <controlTable v-if="showPaneControls" paneType="pane"/>
    <!-- <table v-if="showPaneControls">
      <tr>
        <th>field</th>
        <th>value</th>
        <th>new</th>
        <th>increment</th>
        <th>set</th>
      </tr>
      <tr v-for="(value, key) in paneVals.attributes.rotations" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newPaneRotation[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateRotation('pane', item)">
            +
          </button>
        </td>
      </tr>
      <tr v-for="(value, key) in paneVals.attributes.size" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newPaneSize[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateSize('pane', item)">
            +
          </button>
        </td>
      </tr>
       <tr v-for="(value, key) in paneVals.attributes.position" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newPanePosition[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updatePosition('pane', item)">
            +
          </button>
        </td>
      </tr>
       <tr v-for="(value, key) in paneVals.attributes.colors" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newPaneColor[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateColor('pane', item)">
            +
          </button>
        </td>
      </tr>
        <td>z index</td>
        <td>{{paneVals.attributes.zIndex}}</td>
        <td>
          <input v-model="newPaneZIndex"/>
        </td>
        <td v-for="(item, index) in ['inc', 'set']" :key="index">
          <button v-on:click="updateZIndex('pane', item)">
            +
          </button>
        </td>
      </tr>
    </table> -->
    </div>
  </div>
</template>

<script>
import controlTable from '@/components/controlTable'
  export default {
    name: 'Controller',
    components: {
      controlTable
    },
    data() {
      return {
        showHolderControls: true,
        showPaneControls: true, 
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
        return [targetOld, targetMethods]
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
        const [targetOld, targetMethods] = this.makeTargets(paneType, 'rotations')
        const newVals = this.makeNewVals(targetNew, targetOld, which, operation)
        targetMethods.updateRotation(newVals.x, newVals.y, newVals.z, newVals.spin, newVals.perspective)
      },
      updateSize(paneType, operation, which, targetNew) {
        const [targetOld, targetMethods] = this.makeTargets(paneType, 'size')
        const newVals = this.makeNewVals(targetNew, targetOld, which, operation)
        targetMethods.updateSize(newVals.height, newVals.width)
      },
      updatePosition(paneType, operation, which, targetNew) {
        const [targetOld, targetMethods] = this.makeTargets(paneType, 'position')
        const newVals = this.makeNewVals(targetNew, targetOld, which, operation)
        targetMethods.updatePosition(newVals.top, newVals.left, newVals.zIndex)
      },
      updateColor(paneType, operation, which, targetNew) {
        const [targetOld, targetMethods] = this.makeTargets(paneType, 'colors')
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
        console.log('adding')
        const customAtts = false
        this.$store.commit('addPaneHolder', customAtts)
        console.log(this.$store.state.paneHolders)
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