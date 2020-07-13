import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import NewNoteForm from '../NewNoteForm'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('NewNoteForm component', () => {
  let wrapper, actions, noteGetters, store

  beforeEach(() => {
    actions = {
      'notes/changeNotes': jest.fn(),
    }
    noteGetters = {
      notesArr: () => [],
    }
    store = new Vuex.Store({
      actions,
      modules: {
        notes: {
          namespaced: true,
          getters: noteGetters,
        },
      },
    })

    wrapper = shallowMount(NewNoteForm, {
      localVue,
      store,
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can submit on btn', async () => {
    expect.assertions(1)
    wrapper.setData({
      form: {
        title: 'asdasdasd',
      },
    })
    await localVue.nextTick()
    const submitBtn = wrapper.findAll('MyBtn-stub').at(1)
    submitBtn.trigger('submit')
    expect(actions['notes/changeNotes']).toHaveBeenCalled()
  })

  it('can submit on input', async () => {
    expect.assertions(1)
    wrapper.setData({
      form: {
        title: 'asdasdasd',
      },
    })
    await localVue.nextTick()
    const myInput = wrapper.find('MyInput-stub')
    myInput.trigger('submit')
    expect(actions['notes/changeNotes']).toHaveBeenCalled()
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
