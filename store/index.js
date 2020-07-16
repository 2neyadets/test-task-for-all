
export default {
  actions: {
    nuxtServerInit (context) {
      // console.log('nuxtServerInit, context: ', JSON.stringify(context, null, 2))
    },
    screenChanged ({ commit }, eventTarget) {
      commit('setHeight', eventTarget.innerHeight)
      commit('setWidth', eventTarget.innerWidth)
    },
    changeDialogState ({ commit }, dialogName) {
      commit('setDialogState', dialogName)
    },
  },

  mutations: {
    setHeight (state, height) {
      state.screen.height = height || '100vh'
    },
    setWidth (state, width) {
      state.screen.width = width || '100vw'
    },
    setDialogState (state, dialogName) {
      state.dialogs[dialogName] = !state.dialogs[dialogName]
    },
  },

  state: () => ({
    screen: {
      height: '100vh',
      width: '100vw',
    },
    dialogs: {
      newNote: false,
      deleteNote: false,
      cancelEditNote: false,
    },
  }),

  getters: {
    viewportHeight: s => s.screen.height,
    viewportWidth: s => s.screen.width,
    newNoteDialog: s => s.dialogs.newNote,
    deleteNoteDialog: s => s.dialogs.deleteNote,
    cancelEditNoteDialog: s => s.dialogs.cancelEditNote,
  }
}
