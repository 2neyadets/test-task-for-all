import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import DefaultLayout from '../default'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DefaultLayout component', () => {
  let wrapper, actions, getters, store

  beforeEach(() => {
    actions = {
      'notes/getInitialNotesFromStorage': jest.fn(),
      screenChanged: jest.fn(),
    }
    getters = {
      viewportHeight: () => 640,
      viewportWidth: () => 360,
    }
    store = new Vuex.Store({
      actions,
      getters,
    })
    wrapper = shallowMount(DefaultLayout, {
      localVue,
      store,
      stubs: ['Nuxt', 'NuxtLink'],
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('show/hide task link depends on screen width', () => {
    expect.assertions(2)
    expect(wrapper.findAll('NuxtLink-stub').length).toBe(1)
    const localGetters = {
      viewportHeight: () => '100vh',
      viewportWidth: () => '100vw',
    }
    const localStore = new Vuex.Store({
      actions,
      getters: localGetters,
    })
    const localWrapper = shallowMount(DefaultLayout, {
      localVue,
      store: localStore,
      stubs: ['Nuxt', 'NuxtLink'],
    })
    expect(localWrapper.findAll('NuxtLink-stub').length).toBe(2)
  })

  it('app height === viewportHeight', () => {
    expect.assertions(1)
    expect(wrapper.find('.column').attributes('style')).toBe(`height: ${wrapper.vm.viewportHeightLayout};`)
  })

  it('getInitialNotesFromStorage was called', () => {
    expect.assertions(1)
    expect(actions['notes/getInitialNotesFromStorage']).toHaveBeenCalled()
  })

  it('interact with windowResized', () => {
    expect.assertions(2)
    const startLenghtOfCalls = actions.screenChanged.mock.calls.length
    wrapper.vm.windowResized(undefined)
    expect(actions.screenChanged.mock.calls.length).toBe(startLenghtOfCalls)
    wrapper.vm.windowResized({ innerWidth: 1024, innerHeight: 768 })
    expect(actions.screenChanged.mock.calls.length).not.toBe(startLenghtOfCalls)
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('remove event listener before destroy wrapper', () => {
    wrapper.destroy()
  })
})
