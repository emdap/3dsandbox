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
    <table v-if="showHolderControls">
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
          <button v-on:click="updateRotation('holder', item)">
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
          <button v-on:click="updateSize('holder', item)">
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
          <button v-on:click="updatePosition('holder', item)">
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
          <button v-on:click="updateColor('holder', item)">
            +
          </button>
        </td>
      </tr>
      <tr>
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
    </table>
    </div>

    <div id="paneControls" class="controllHolder" v-if="$store.state.activePane">
      <div class="controlHeader">
        {{$store.state.activePane.id}} CONTROL
      </div>
      <button class="duplicate" v-on:click="duplicatePane">duplicate</button>
      <button class="showControls" v-on:click="showPaneControls = !showPaneControls">
        {{showPaneControls ? "hide pane controls" : "show pane controls"}}
      </button>
    <table v-if="showPaneControls">
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
      <tr>
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
    </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showHolderControls: true,
        showPaneControls: true,
        newHolderRotation: {
          x: 0,
          y: 0,
          z: 0,
          spin: 0,
          perspective: 0
        },
        newHolderSize: {
          height: 0,
          width: 0
        },
        newHolderPosition: {
          top: 0,
          left: 0
        },
        newHolderColor: {
          red: 0,
          green: 0,
          blue: 0,
          opacity: 0
        },
        newHolderZIndex: 0,
        newPaneRotation: {
          x: 0,
          y: 0,
          z: 0,
          spin: 0,
          perspective: 0
        },
        newPaneSize: {
          height: 0,
          width: 0
        },
        newPanePosition: {
          top: 0,
          left: 0
        },
        newPaneColor: {
          red: 0,
          green: 0,
          blue: 0,
          opacity: 0
        },
        newPaneZIndex: 0
      }
    },
    watch: {
      newHolderRotation: function () {
        console.log(this.newHolderRotation)
      }
    },
    computed: {
      holderVals: function () {
        return this.$store.state.activePaneHolder
      },
      paneVals: function() {
        return this.$store.state.activePane
      }
    },
    methods: {
      updateRotation(paneType, operation) {
        let targetNew, targetOld, targetMethods
        if (paneType == 'holder') {
          targetNew = this.newHolderRotation
          targetOld =  this.holderVals.attributes.rotations
          targetMethods = this.$store.state.activePaneHolder.methods
        } else if (paneType == 'pane') {
          targetNew = this.newPaneRotation
          targetOld =  this.paneVals.attributes.rotations
          targetMethods = this.$store.state.activePane.methods
        }
        if (operation == 'inc') {
          const newX = targetNew.x * 1 + targetOld.x * 1
          const newY = targetNew.y * 1 + targetOld.y * 1
          const newZ = targetNew.z * 1 + targetOld.z * 1
          const newSpin = targetNew.spin * 1 + targetOld.spin * 1
          const newPerspective = targetNew.perspective + targetOld.perspective
          targetMethods.updateRotation(
            newX, newY, newZ, newSpin, newPerspective
          )
        } else if (operation == 'set') {
          targetMethods.updateRotation(
            targetNew.x, targetNew.y, targetNew.z, 
            targetNew.spin, targetNew.perspective
          )
        }
      },
      updateSize(paneType, operation) {
        let targetNew, targetOld, targetMethods
        if (paneType == 'holder') {
          targetNew = this.newHolderSize
          targetOld =  this.holderVals.attributes.size
          targetMethods = this.$store.state.activePaneHolder.methods
        } else if (paneType == 'pane') {
          targetNew = this.newPaneSize
          targetOld =  this.paneVals.attributes.size
          targetMethods = this.$store.state.activePane.methods
        }
        if (operation == 'inc') {
          const newH = targetNew.height * 1 + targetOld.height * 1
          const newW = targetNew.width * 1 + targetOld.width * 1
          targetMethods.updateSize(newH, newW)
        } else if (operation == 'set') {
          targetMethods.updateSize(targetNew.height, targetNew.width)
        }
      },
      updatePosition(paneType, operation) {
        let targetNew, targetOld, targetMethods
        if (paneType == 'holder') {
          targetNew = this.newHolderPosition
          targetOld =  this.holderVals.attributes.position
          targetMethods = this.$store.state.activePaneHolder.methods
        } else if (paneType == 'pane') {
          targetNew = this.newPanePosition
          targetOld =  this.paneVals.attributes.position
          targetMethods = this.$store.state.activePane.methods
        }
        if (operation == 'inc') {
          const newT = targetNew.top * 1 + targetOld.top * 1
          const newL = targetNew.left * 1 + targetOld.left * 1
          targetMethods.updatePosition(newT, newL)
        } else if (operation == 'set') {
          targetMethods.updatePosition(targetNew.top, targetNew.left)
        }
      },
      updateColor(paneType, operation) {
        let targetNew, targetOld, targetMethods
        if (paneType == 'holder') {
          targetNew = this.newHolderColor
          targetOld =  this.holderVals.attributes.colors
          targetMethods = this.$store.state.activePaneHolder.methods
        } else if (paneType == 'pane') {
          targetNew = this.newPaneColor
          targetOld =  this.paneVals.attributes.colors
          targetMethods = this.$store.state.activePane.methods
        }
        if (operation == 'inc') {
          const newR = targetNew.red * 1 + targetOld.red * 1
          const newG = targetNew.green * 1 + targetOld.green * 1
          const newB = targetNew.blue * 1 + targetOld.blue * 1
          const newO = targetNew.opacity * 1 + targetOld.opacity * 1
          targetMethods.updateColor(newR, newG, newB, newO)
        } else if (operation == 'set') {
          targetMethods.updateColor(targetNew.red, targetNew.green, targetNew.blue, targetNew.opacity)
        }
      },
      updateZIndex(paneType, operation) {
        
        let targetNew, targetOld, targetMethods
        if (paneType == 'holder') {
          targetNew = this.newHolderZIndex
          targetOld =  this.holderVals.attributes.zIndex
          targetMethods = this.$store.state.activePaneHolder.methods
        } else if (paneType == 'pane') {
          targetNew = this.newPaneZIndex
          targetOld =  this.paneVals.attributes.zIndex
          targetMethods = this.$store.state.activePane.methods
        }
        if (operation == 'inc') {
          const newZ = targetNew * 1 + targetOld * 1
          targetMethods.updateZIndex(newZ)
        } else if (operation == 'set') {
          targetMethods.updateZIndex(targetNew)
        }
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

table {
  width: 300px;
  border-spacing: 5px;
  border-collapse: separate;
  font-size: .9rem;
}

table button {
  border: 1px solid #00AA66;
  background: none;
}

th {
  text-align: left;
}

td {
  text-align: left;
  /* padding: 10px; */
}

input {
  width: 2rem;
  height: .7rem;
  font-size: inherit;
}

</style>