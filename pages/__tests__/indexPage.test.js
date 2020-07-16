import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import IndexPage from '../index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('IndexPage component', () => {
  let wrapper, actions, noteGetters, store
  const testNote = {
    id: 'f1733253812c-f300272d',
    title: 'Название заметки',
  }

  beforeEach(() => {
    actions = {
      changeDialogState: jest.fn(),
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

    wrapper = shallowMount(IndexPage, {
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

  it('can show Carousel when notesArr not empty', () => {
    expect.assertions(2)
    expect(wrapper.find('Carousel-stub').exists()).toBe(false)
    const localStore = new Vuex.Store({
      actions,
      modules: {
        notes: {
          namespaced: true,
          getters: {
            notesArr: () => [testNote],
          },
        },
      },
    })
    const localWrapper = shallowMount(IndexPage, {
      localVue,
      store: localStore,
    })
    expect(localWrapper.find('Carousel-stub').exists()).toBe(true)
  })

  it('can call changeDialogState method', () => {
    expect.assertions(1)
    wrapper.find('MyBtn-stub').trigger('click')
    expect(actions.changeDialogState).toHaveBeenCalled()
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
