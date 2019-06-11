import Vue from 'vue'
import Vuex from 'vuex'
import {paneDefaults, holderDefaults} from './defaults'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePane: {},
    panes: [],
    activePaneHolder: {},
    paneHolders: [],
  },
  mutations: {
    updateActive (state, pane) {
      state.activePane = pane
      console.log(`active pane is ${pane.id}`)
      console.log(pane)
    },
    addPane (state, payload) {
      const pane = {
        holderId: payload.holderId,
        id: `pane${state.panes.length + 1}`,
        paneAttributes: payload.attributes
      }
      // pane.paneAttributes = payload.customAtts ? payload.customAtts : paneDefaults
      state.panes.push(pane)
      const holder = state.paneHolders.find( x => {
        return x.id == pane.holderId;
      })
      holder.internalPanes.push(pane)
      console.log(holder.internalPanes)
    },
    addPaneHolder (state, attributes) {
      let paneHolder = {
        id: `holder${state.paneHolders.length + 1}`,
        internalPanes: [],
        paneAttributes: attributes
      }
      // paneHolder.paneAttributes = customAtts ? customAtts : holderDefaults
      console.log(paneHolder.paneAttributes.position.top)
      state.paneHolders.push(paneHolder)
    },
    updateActiveHolder (state, paneHolder) {
      state.activePaneHolder = paneHolder
      console.log(`active pane holder is ${paneHolder.id}`)
      console.log(paneHolder)
    },
    updateHolderAtts(state, newAtts) {
      const holder = state.paneHolders.find( x => {
        return x.id == state.activePane.id
      })
      console.log(newAtts)
      holder.paneAttributes = newAtts
      console.log(state.paneHolders)
    }
  },
  actions: {

  }
})
