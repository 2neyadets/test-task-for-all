import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import noteStore from '../notes'
const noteActions = noteStore.actions,
  noteMutations = noteStore.mutations,
  noteState = noteStore.state,
  noteGetters = noteStore.getters

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Notes Store', () => {
  let store
  const notesArrMock = [
    {
      id: 'f17351326a68-f48d2c4d',
      title: '11111111111111111111',
    },
    {
      id: 'f17351327bb8-f159ba6c',
      title: '22222222222222222222',
      tasks: [
        {
          done: false,
          id: 'f173325392ff-f4a0c9a4',
          text: 'Текст задачи',
        }
      ],
    },
    {
      id: 'f17351328cd9-f20337e2',
      title: '33333333333333333333',
    },
  ]

  beforeEach(() => {
    localStorage.setItem('notes', JSON.stringify(notesArrMock))

    store = new Vuex.Store({
      modules: {
        notes: {
          namespaced: true,
          actions: noteActions,
          mutations: noteMutations,
          state: () => JSON.parse(JSON.stringify(noteState())),
          getters: noteGetters,
        },
      },
    })
  })

  it('can get initial notes', async () => {
    expect.assertions(2)
    expect(store.getters['notes/notesArr']).toEqual([])
    await store.dispatch('notes/getInitialNotesFromStorage')
    expect(store.getters['notes/notesArr']).toEqual(notesArrMock)
  })

  it('can change notes', async () => {
    expect.assertions(5)
    const testNotes = [
      {
        id: 'f17351328cd9-f20337e2',
        title: '33333333333333333333',
      },
    ]
    await store.dispatch('notes/getInitialNotesFromStorage')
    expect(store.getters['notes/notesArr']).toEqual(notesArrMock)
    await store.dispatch('notes/changeNotes', testNotes)
    expect(JSON.parse(localStorage.getItem('notes'))).toEqual(testNotes)
    expect(store.getters['notes/notesArr']).toEqual(testNotes)
    await store.dispatch('notes/changeNotes', undefined)
    expect(store.getters['notes/notesArr']).toEqual([])
    expect(JSON.parse(localStorage.getItem('notes'))).toEqual([])
  })

  it('can change current note', async () => {
    expect.assertions(2)
    expect(store.getters['notes/currentNote']).toBe(null)
    await store.dispatch('notes/changeCurrentNote', notesArrMock[1])
    expect(store.getters['notes/currentNote']).toEqual(notesArrMock[1])
  })

  it('can update note', async () => {
    expect.assertions(3)
    const noteForUpdate = {
        id: 'f17351326a68-f48d2c4d',
        title: 'newTitle',
      },
      updatedNotesArrMock = [...notesArrMock]
    updatedNotesArrMock.splice(updatedNotesArrMock.findIndex(item => item.id === noteForUpdate.id), 1, noteForUpdate)
    await store.dispatch('notes/getInitialNotesFromStorage')
    expect(store.getters['notes/notesArr']).toEqual(notesArrMock)
    await store.dispatch('notes/updateNoteAction', noteForUpdate)
    expect(JSON.parse(localStorage.getItem('notes'))).toEqual(updatedNotesArrMock)
    expect(store.getters['notes/notesArr']).toEqual(updatedNotesArrMock)
  })

  it('can delete note', async () => {
    expect.assertions(2)
    const noteId = 'f17351328cd9-f20337e2'
    await store.dispatch('notes/getInitialNotesFromStorage')
    expect(store.getters['notes/notesArr'].length).toBe(3)
    await store.dispatch('notes/deleteNoteAction', noteId)
    expect(store.getters['notes/notesArr'].length).toBe(2)
  })
})
