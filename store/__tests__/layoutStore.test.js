import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import layoutStore from '../index'
const layoutActions = layoutStore.actions,
  layoutMutations = layoutStore.mutations,
  layoutState = layoutStore.state,
  layoutGetters = layoutStore.getters

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Layout Store', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      actions: layoutActions,
      mutations: layoutMutations,
      state: () => JSON.parse(JSON.stringify(layoutState())),
      getters: layoutGetters,
    })
  })

  it('can react on screen change', async () => {
    expect.assertions(6)
    expect(store.getters.viewportWidth).toBe('100vw')
    expect(store.getters.viewportHeight).toBe('100vh')
    await store.dispatch('screenChanged', { innerWidth: null, innerHeight: undefined })
    expect(store.getters.viewportWidth).toBe('100vw')
    expect(store.getters.viewportHeight).toBe('100vh')
    await store.dispatch('screenChanged', { innerWidth: 500, innerHeight: 700 })
    expect(store.getters.viewportWidth).toBe(500)
    expect(store.getters.viewportHeight).toBe(700)
  })

  it('can react on dialog state change', async () => {
    expect.assertions(15)
    expect(store.getters.newNoteDialog).toBe(false)
    expect(store.getters.deleteNoteDialog).toBe(false)
    expect(store.getters.cancelEditNoteDialog).toBe(false)
    await store.dispatch('changeDialogState', 'newNote')
    expect(store.getters.newNoteDialog).toBe(true)
    expect(store.getters.deleteNoteDialog).toBe(false)
    expect(store.getters.cancelEditNoteDialog).toBe(false)
    await store.dispatch('changeDialogState', 'deleteNote')
    expect(store.getters.newNoteDialog).toBe(true)
    expect(store.getters.deleteNoteDialog).toBe(true)
    expect(store.getters.cancelEditNoteDialog).toBe(false)
    await store.dispatch('changeDialogState', 'cancelEditNote')
    expect(store.getters.newNoteDialog).toBe(true)
    expect(store.getters.deleteNoteDialog).toBe(true)
    expect(store.getters.cancelEditNoteDialog).toBe(true)
    await store.dispatch('changeDialogState', 'newNote')
    await store.dispatch('changeDialogState', 'deleteNote')
    await store.dispatch('changeDialogState', 'cancelEditNote')
    expect(store.getters.newNoteDialog).toBe(false)
    expect(store.getters.deleteNoteDialog).toBe(false)
    expect(store.getters.cancelEditNoteDialog).toBe(false)
  })
})
