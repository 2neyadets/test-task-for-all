
export default {
  actions: {
    getInitialNotesFromStorage ({ commit }) {
      const initialNotes = localStorage.getItem('notes')
      commit('setNotes', (initialNotes && JSON.parse(initialNotes)))
    },
    changeNotes ({ commit }, notes) {
      commit('setNotes', notes)
    },
    changeCurrentNote ({ commit }, note) {
      commit('setCurrentNote', note)
    },
    updateNoteAction ({ commit }, note) {
      commit('updateNote', note)
    },
    deleteNoteAction (context, noteId) {
      const notes = [...context.getters.notesArr]
      const index = notes.findIndex(note => note.id === noteId)
      notes.splice(index, 1)
      context.dispatch('changeNotes', notes)
      context.commit('setCurrentNote', null)
    },
  },

  mutations: {
    setNotes (state, notes) {
      state.list = notes || []
      localStorage.setItem('notes', JSON.stringify(state.list))
    },
    updateNote (state, note) {
      state.list.splice(state.list.findIndex(item => item.id === note.id), 1, note)
      localStorage.setItem('notes', JSON.stringify(state.list))
    },
    setCurrentNote (state, note) {
      state.current = note || null
    },
  },

  state: () => ({
    list: [],
    current: null,
  }),

  getters: {
    notesArr: s => s.list,
    currentNote: s => s.current,
  }
}
