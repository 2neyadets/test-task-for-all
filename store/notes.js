
export const actions = {
  getInitialNotesFromStorage ({ commit }) {
    const initialNotes = localStorage.getItem('notes')
    commit('setNotes', (initialNotes && JSON.parse(initialNotes)))
  },
  changeNotes ({ commit }, notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
    commit('setNotes', notes)
  },
  changeCurrentNote ({ commit }, note) {
    commit('setCurrentNote', note)
  },
  deleteNoteAction (context, noteId) {
    const notes = [...context.getters.notesArr]
    const index = notes.findIndex(note => note.id === noteId)
    notes.splice(index, 1)
    context.dispatch('changeNotes', notes)
    context.commit('setCurrentNote', null)
  },
}

export const mutations = {
  setNotes (state, notes) {
    state.list = notes || []
  },
  setCurrentNote (state, note) {
    state.current = note || null
  },
}

export const state = () => ({
  list: [],
  current: null,
})

export const getters = {
  notesArr: s => s.list,
  currentNote: s => s.current,
}
