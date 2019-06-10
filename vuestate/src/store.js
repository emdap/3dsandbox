import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePane: {},
    panes: [],
    activePaneHolder: {},
    paneHolders: []
  },
  mutations: {
    updateActive (state, pane) {
      state.activePane = pane
      console.log(`active pane is ${pane.id}`)
      console.log(pane)
    },
    addPane (state, pane) {
      state.panes.push(pane)
      const holder = state.paneHolders.find( x => {
        return x.id == pane.holderId;
      })
      holder.internalPanes.push(pane)
      console.log(holder.internalPanes)
    },
    addPaneHolder (state, paneHolder) {
      state.paneHolders.push(paneHolder)
    },
    updateActiveHolder (state, paneHolder) {
      state.activePaneHolder = paneHolder
      console.log(`active pane is ${paneHolder.id}`)
      console.log(paneHolder)
    }
  },
  actions: {

  }
})
