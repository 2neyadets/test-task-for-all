import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MyCheckbox from '../MyCheckbox'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyCheckbox component', () => {
  let wrapper
  const mockId = '1482363367071',
    label = 'Название',
    task = { done: false }

  beforeEach(() => {
    wrapper = shallowMount(MyCheckbox, {
      localVue,
      propsData: {
        mockId,
        label,
        task,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can be editable and not', async () => {
    expect.assertions(4)
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('MyInput-stub').exists()).toBe(false)
    wrapper.setProps({
      editable: true,
    })
    await localVue.nextTick()
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.find('MyInput-stub').exists()).toBe(true)
  })

  it('id on checkbox and label', () => {
    expect.assertions(2)
    expect(wrapper.find('.checkbox').attributes('id')).toBe(mockId)
    expect(wrapper.find('label').attributes('for')).toBe(mockId)
  })

  it('use getId func when !mockId', async () => {
    expect.assertions(1)
    const localWrapper = shallowMount(MyCheckbox, {
      localVue,
      propsData: {
        label,
        task,
      },
    })
    await localVue.nextTick()
    expect(localWrapper.vm.$data.id).not.toBe(mockId)
  })

  it('can be disabled', async () => {
    expect.assertions(1)
    wrapper.setProps({
      disable: true,
    })
    await localVue.nextTick()
    expect(wrapper.find('.checkbox').classes('disabled')).toBe(true)
  })

  it('can emit "true" on click', () => {
    expect.assertions(1)
    wrapper.find('.checkbox').trigger('click')
    expect(wrapper.emitted().inputDone[0]).toEqual([true])
  })

  it('can emit "false" on click', async () => {
    expect.assertions(1)
    wrapper.setProps({
      task: { done: true }
    })
    await localVue.nextTick()
    wrapper.find('.checkbox').trigger('click')
    expect(wrapper.emitted().inputDone[0]).toEqual([false])
  })

  it('can change aria-checked', async () => {
    expect.assertions(2)
    expect(wrapper.find('.checkbox').attributes('aria-checked')).toBe(undefined)
    wrapper.setProps({
      task: { done: true }
    })
    await localVue.nextTick()
    expect(wrapper.find('.checkbox').attributes('aria-checked')).toBeTruthy()
  })

  it('can show checked and unchecked state', async () => {
    expect.assertions(2)
    expect(wrapper.find('.checkbox__inner').classes('checkbox__inner--falsy')).toBe(true)
    wrapper.setProps({
      task: { done: true }
    })
    await localVue.nextTick()
    expect(wrapper.find('.checkbox__inner').classes('checkbox__inner--truthy')).toBe(true)
  })

  it('can change size', async () => {
    expect.assertions(2)
    wrapper.setProps({
      size: 35,
    })
    await localVue.nextTick()
    expect(wrapper.find('.checkbox__inner').attributes().style).toBe('font-size: 35px;')
    wrapper.setProps({
      size: '35',
    })
    await localVue.nextTick()
    expect(wrapper.find('.checkbox__inner').attributes().style).toBe('font-size: 35px;')
  })

  it('smaller font for label when long label', async () => {
    expect.assertions(1)
    wrapper.setProps({
      label: 'adadsadasdasdasdasda',
    })
    await localVue.nextTick()
    expect(wrapper.find('label').attributes().style).toBe('font-size: 11px;')
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
