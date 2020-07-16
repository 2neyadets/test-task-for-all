import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import DeleteNoteDialog from '../DeleteNoteDialog'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

describe('DeleteNoteDialog component', () => {
  let wrapper, actions, noteGetters, getters, store
  const currentNote = {
    id: 'f1733253812c-f300272d',
    title: 'Название заметки',
  }
  router.push(`/note/${currentNote.id}`)

  beforeEach(() => {
    actions = {
      changeDialogState: jest.fn(),
      'notes/deleteNoteAction': jest.fn(),
    }
    noteGetters = {
      currentNote: () => ({ ...currentNote }),
    }
    getters = {
      deleteNoteDialog: () => true,
    }
    store = new Vuex.Store({
      actions,
      getters,
      modules: {
        notes: {
          namespaced: true,
          getters: noteGetters,
        },
      },
    })

    wrapper = shallowMount(DeleteNoteDialog, {
      localVue,
      store,
      router,
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can close dialog', () => {
    expect.assertions(1)
    const btn = wrapper.findAll('MyBtn-stub').at(0)
    btn.trigger('click')
    expect(actions.changeDialogState).toHaveBeenCalled()
  })

  it('can delete note', () => {
    expect.assertions(3)
    const btn = wrapper.findAll('MyBtn-stub').at(1)
    btn.trigger('click')
    expect(actions.changeDialogState).toHaveBeenCalled()
    expect(actions['notes/deleteNoteAction']).toHaveBeenCalled()
    expect(router.currentRoute.fullPath).toBe('/')
  })

  it('contains note.title', () => {
    expect.assertions(1)
    expect(wrapper.find('H6').html()).toContain(currentNote.title)
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
