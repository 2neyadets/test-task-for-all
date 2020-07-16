import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import NoteIdPage from '../note/_id'
import layoutStore from '../../store/index'
const layoutActions = layoutStore.actions,
  layoutMutations = layoutStore.mutations,
  layoutState = layoutStore.state,
  layoutGetters = layoutStore.getters
import noteStore from '../../store/notes'
const noteActions = noteStore.actions,
  noteMutations = noteStore.mutations,
  noteState = noteStore.state,
  noteGetters = noteStore.getters

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'note-id',
      path: '/note/:id',
    }
  ]
})

describe('NoteIdPage component', () => {
  let wrapper, store
  const currentNote = {
    id: 'f1733253812c-f300272d',
    title: 'Название заметки',
  }

  beforeEach(() => {
    store = new Vuex.Store({
      actions: layoutActions,
      mutations: layoutMutations,
      state: layoutState,
      getters: layoutGetters,
      modules: {
        notes: {
          namespaced: true,
          actions: noteActions,
          mutations: noteMutations,
          state: noteState,
          getters: noteGetters,
        },
      },
    })

    if (router.currentRoute.fullPath !== `/note/${currentNote.id}`) {
      router.push({
        name: 'note-id',
        // path: `/note/${currentNote.id}`,
        params: {
          id: currentNote.id,
        },
      })
    }
    store.dispatch('notes/changeNotes', [currentNote])
    store.dispatch('notes/changeCurrentNote', currentNote)

    wrapper = shallowMount(NoteIdPage, {
      localVue,
      store,
      router,
      stubs: ['NuxtLink'],
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can show edit form when have currentNote', () => {
    expect.assertions(1)
    expect(wrapper.find('EditNoteForm-stub').exists()).toBe(true)
  })

  it('can show not exist note message and go home btn', async () => {
    expect.assertions(2)
    router.push('/note/123123123')
    store.dispatch('notes/changeNotes', [])
    store.dispatch('notes/changeCurrentNote', null)
    await localVue.nextTick()
    expect(wrapper.find('EditNoteForm-stub').exists()).toBe(false)
    expect(wrapper.find('MyBtn-stub').exists()).toBe(true)
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
