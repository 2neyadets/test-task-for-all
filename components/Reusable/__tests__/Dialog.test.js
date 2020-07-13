import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Dialog from '../Dialog'
import MyBtn from '../MyBtn'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Dialog component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Dialog, {
      localVue,
      propsData: {
        value: true,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('disappear when false value', async () => {
    expect.assertions(2)
    wrapper.setProps({
      value: false,
    })
    await localVue.nextTick()
    expect(wrapper.find('.dialog__backdrop').exists()).toBe(false)
    expect(wrapper.find('.dialog__inner').exists()).toBe(false)
  })

  it('can emit "hide" on backdrop click', () => {
    expect.assertions(1)
    wrapper.find('.dialog__backdrop').trigger('click')
    expect(wrapper.emitted().hide[0]).toEqual([])
  })

  it('slot works', () => {
    expect.assertions(1)
    const localWrapper = shallowMount(Dialog, {
      propsData: {
        value: true,
      },
      slots: {
        default: MyBtn,
      }
    })
    expect(localWrapper.find('button').exists()).toBe(true)
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
