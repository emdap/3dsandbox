import Vue from 'vue'
import Vuex from 'vuex'
const _ = require('lodash')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePane: false,
    panes: [],
    activePaneHolder: false,
    paneHolders: [],
  },
  mutations: {
    updateActive (state, pane) {
      state.activePane = pane
    },
    addPane (state, payload) {
      const pane = {
        holderId: payload.holderId,
        id: `pane${state.panes.length + 1}`,
        customAtts: payload.customAtts
      }
      // pane.paneAttributes = payload.customAtts ? payload.customAtts : paneDefaults
      state.panes.push(pane)
      const holder = state.paneHolders.find( x => {
        return x.id == pane.holderId;
      })
      holder.internalPanes.push(pane)
    },
    addPaneHolder (state, payload) {
      let paneHolder = {
        id: `holder${state.paneHolders.length + 1}`,
        internalPanes: []
      }
      if (payload) {
        if (payload.customAtts) {
          paneHolder.customAtts = payload.customAtts
        }
        if (payload.internalPanes) {
          paneHolder.internalPanes = payload.internalPanes
        }
      }
      state.paneHolders.push(paneHolder)
    },
    updateActiveHolder (state, paneHolder) {
      state.activePaneHolder = paneHolder
    },
    updateHolderAtts(state, newAtts) {
      const holder = state.paneHolders.find( x => {
        return x.id == state.activePane.id
      })
      holder.paneAttributes = newAtts
    }
  },
  actions: {
    duplicatePane({commit}, pane) {
      const payload = {
        holderId: pane.holderId,
        customAtts: _.cloneDeep(pane.attributes)
      }
      commit('addPane', payload)
    },
    duplicateHolder({state, commit}, holder) {
      const stateHolder = state.paneHolders.find(x => {
        return x.id = holder.id
      })
      const payload = {
        customAtts: _.cloneDeep(holder.attributes),
        internalPanes: _.cloneDeep(stateHolder.internalPanes)
      }
      console.log(payload.internalPanes)
      commit('addPaneHolder', payload)
    }
  }
})
