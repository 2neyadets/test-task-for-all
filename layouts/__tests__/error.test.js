import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ErrorLayout from '../error'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ErrorLayout component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ErrorLayout, {
      localVue,
      stubs: ['NuxtLink'],
      propsData: {
        error: {
          statusCode: 404,
        },
      }
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can show corresponding messages', async () => {
    expect.assertions(2)
    expect(wrapper.find('H1').html()).toContain('404')
    wrapper.setProps({
      error: {
        statusCode: undefined,
      },
    })
    await localVue.nextTick()
    expect(wrapper.find('H1').html()).not.toContain('404')
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
