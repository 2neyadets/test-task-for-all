import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TaskPage from '../task'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TaskPage component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(TaskPage, {
      localVue,
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
