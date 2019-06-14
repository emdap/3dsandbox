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
    totalPanes: 0,
    totalHolders: 0
  },
  mutations: {
    updateActive (state, pane) {
      state.activePane = pane
    },
    addPane (state, payload) {
      const pane = {
        holderId: payload.holderId,
        id: `pane${state.totalPanes + 1}`,
        customAtts: payload.customAtts
      }
      console.log(pane)
      state.totalPanes++
      // pane.paneAttributes = payload.customAtts ? payload.customAtts : paneDefaults
      state.panes.push(pane)
      const holder = state.paneHolders.find( x => {
        return x.id == pane.holderId;
      })
      holder.internalPanes.push(pane)
    },
    addPaneHolder (state, payload) {
      let paneHolder = {
        id: `holder${state.totalHolders + 1}`,
        internalPanes: []
      }
      state.totalHolders++
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
    },
    addActivateMethod(state, payload) {
      let paneList
      if (payload.paneType == 'holder') {
        paneList = state.paneHolders
      } else {
        paneList = state.panes
      }
      const pane = paneList.find(x => {
        return x.id == payload.id
      })
      pane.activate = payload.updateActive
    },
    removePane(state, pane) {
      state.panes = state.panes.filter(x => {
        return x.id != pane.id
      })
      const holder = state.paneHolders.find( x => {
        return x.id == pane.holderId;
      })
      holder.internalPanes = holder.internalPanes.filter(x => {
        return x.id != pane.id
      })
    },
    removeHolder(state, paneId) {
      state.paneHolders = state.paneHolders.filter(x => {
        return x.id != paneId
      })
    },
    updateCustomAtts(state, payload) {
      let paneList
      if (payload.paneType == 'pane') {
        paneList = state.panes
      } else {
        paneList = state.paneHolders
      }
      let pane = paneList.find(x => {
        return x.id == payload.id
      })
      pane.customAtts = payload.attributes
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
        return x.id == holder.id
      })
      let duplicate = {
        id: `holder${state.totalHolders + 1}`,
        customAtts: _.cloneDeep(holder.attributes)
      }
      commit('addPaneHolder', duplicate)
      const stateDuplicate = state.paneHolders.find(x => {
        return x.id == duplicate.id
      })
      let internalDuplicates = []
      stateHolder.internalPanes.forEach(pane =>  {
        console.log(pane)
        let duplicatePane = {}
        duplicatePane.customAtts = _.cloneDeep(pane.customAtts)
        duplicatePane.holderId = duplicate.id
        internalDuplicates.push(duplicatePane)
        console.log(internalDuplicates)
      })
      internalDuplicates.forEach(pane => {
        commit('addPane', pane)
      })
    }
  }
})
