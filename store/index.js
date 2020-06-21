
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
  screenChanged ({ commit }, eventTarget) {
    commit('setHeight', eventTarget.innerHeight)
    commit('setWidth', eventTarget.innerWidth)
  },
}

export const mutations = {
  setNotes (state, notes) {
    state.notes = notes || []
  },
  setHeight (state, height) {
    state.screen.height = height || '100vh'
  },
  setWidth (state, width) {
    state.screen.width = width || '100vw'
  },
}

export const state = () => ({
  notes: [],
  screen: {
    height: '100vh',
    width: '100vw',
  },
})

export const getters = {
  notesArr: s => s.notes,
  viewportHeight: s => s.screen.height,
  viewportWidth: s => s.screen.width,
}
