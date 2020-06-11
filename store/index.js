
export const actions = {
  nuxtServerInit (context) {
    console.log('nuxtServerInit, context: ', JSON.stringify(context, null, 2))
  },
  getInitialNotesFromStorage ({ commit }) {
    const initialNotes = localStorage.getItem('notes')
    commit('setNotes', (initialNotes && JSON.parse(initialNotes)))
  },
  changeNotes ({ commit }, notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
    commit('setNotes', notes)
  },
}

export const mutations = {
  setNotes (state, notes) {
    state.notes = notes || []
  }
}

export const state = () => ({
  notes: [],
})

export const getters = {
  notesArr: s => s.notes
}
