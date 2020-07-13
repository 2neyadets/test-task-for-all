import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import NewNoteDialog from '../NewNoteDialog'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('NewNoteDialog component', () => {
  let wrapper, actions, getters, store

  beforeEach(() => {
    actions = {
      changeDialogState: jest.fn(),
    }
    getters = {
      newNoteDialog: () => true,
    }
    store = new Vuex.Store({
      actions,
      getters,
    })

    wrapper = shallowMount(NewNoteDialog, {
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

  it('can handle hide event', async () => {
    expect.assertions(1)
    wrapper.find('NewNoteForm-stub').vm.$parent.$emit('hide')
    await localVue.nextTick()
    expect(actions.changeDialogState).toHaveBeenCalled()
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
