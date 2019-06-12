<template>
  <div class="controlTable">
    <table>
      <tr>
        <th>field</th>
        <th>value</th>
        <th>new</th>
        <th>inc</th>
        <th>dec</th>
        <th>set</th>
      </tr>
      <tr class='highlight'>
        <td colspan=3 class="sectionHeader">Rotations</td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updateRotation(paneType, item, 'all', newRotation)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
      <tr class='highlight' v-for="(value, key) in curAttributes.rotations" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newRotation[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updateRotation(paneType, item, key, newRotation)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
      <tr>
        <td colspan=3 class="sectionHeader">Size</td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updateSize(paneType, item, 'all', newSize)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
      <tr v-for="(value, key) in curAttributes.size" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newSize[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updateSize(paneType, item, key, newSize)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
      <tr class='highlight'>
        <td colspan=3 class="sectionHeader">Position</td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updatePosition(paneType, item, 'all', newPosition)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
      <tr class='highlight' v-for="(value, key) in curAttributes.position" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newPosition[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updatePosition(paneType, item, key, newPosition)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
      <tr>
        <td colspan=3 class="sectionHeader">Colors</td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updateColor(paneType, item, 'all', newColor)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
      <tr v-for="(value, key) in curAttributes.colors" :key="key">
        <td>{{key}}</td>
        <td>{{value}}</td>
        <td>
          <input v-model="newColor[key]"/>
        </td>
        <td v-for="(item, index) in ['inc', 'dec', 'set']" :key="index">
          <button v-on:click="$parent.updateColor(paneType, item, key, newColor)">
            <span v-if="item == 'inc'">+</span>
            <span v-else-if="item == 'dec'">-</span>
            <span v-else>=</span>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ControlTable',
    props: {
      paneType: String
    },
    computed: {
      curAttributes: function () {
        if (this.paneType == 'holder') {
          return this.$store.state.activePaneHolder.attributes
        } else if (this.paneType == 'pane') {
          return this.$store.state.activePane.attributes
        }
      }
    },
    data () {
      return {
        newRotation: {
        x: 0,
          y: 0,
          z: 0,
          spin: 0,
          perspective: 0
        },
        newSize: {
          height: 0,
          width: 0
        },
        newPosition: {
          top: 0,
          left: 0,
          zIndex: 0
        },
        newColor: {
          red: 0,
          green: 0,
          blue: 0,
          opacity: 0
        }
      }
    }
  }
</script>

<style scoped>

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