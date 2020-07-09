import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MyCheckbox from '../MyCheckbox'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyCheckbox component', () => {
  let wrapper
  const mockId = '1482363367071'

  beforeEach(() => {
    const label = 'Название',
      task = { done: false }
    wrapper = shallowMount(MyCheckbox, {
      propsData: {
        mockId,
        label,
        task,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can be editable and not', done => {
    expect.assertions(4)
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('MyInput-stub').exists()).toBe(false)
    wrapper.setProps({
      editable: true,
    })
    localVue.nextTick(() => {
      expect(wrapper.find('label').exists()).toBe(false)
      expect(wrapper.find('MyInput-stub').exists()).toBe(true)
      done()
    })
  })

  it('id on checkbox and label', () => {
    expect.assertions(2)
    expect(wrapper.find('.checkbox').attributes('id')).toBe(mockId)
    expect(wrapper.find('label').attributes('for')).toBe(mockId)
  })

  it('can be disabled', done => {
    wrapper.setProps({
      disable: true,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.find('.checkbox').classes('disabled')).toBe(true)
      done()
    })
  })

  it('can emit "true" on click', () => {
    wrapper.find('.checkbox').trigger('click')
    expect.assertions(1)
    expect(wrapper.emitted().inputDone[0]).toEqual([true])
  })

  it('can emit "false" on click', done => {
    wrapper.setProps({
      task: { done: true }
    })
    localVue.nextTick(() => {
      wrapper.find('.checkbox').trigger('click')
      expect.assertions(1)
      expect(wrapper.emitted().inputDone[0]).toEqual([false])
      done()
    })
  })

  it('can change aria-checked', done => {
    expect.assertions(2)
    expect(wrapper.find('.checkbox').attributes('aria-checked')).toBe(undefined)
    wrapper.setProps({
      task: { done: true }
    })
    localVue.nextTick(() => {
      expect(wrapper.find('.checkbox').attributes('aria-checked')).toBe('true')
      done()
    })
  })

  it('can show checked and unchecked state', done => {
    expect.assertions(2)
    expect(wrapper.find('.checkbox__inner').classes('checkbox__inner--falsy')).toBe(true)
    wrapper.setProps({
      task: { done: true }
    })
    localVue.nextTick(() => {
      expect(wrapper.find('.checkbox__inner').classes('checkbox__inner--truthy')).toBe(true)
      done()
    })
  })

  it('can change size', done => {
    expect.assertions(2)
    wrapper.setProps({
      size: 35,
    })
    localVue.nextTick(() => {
      expect(wrapper.find('.checkbox__inner').attributes().style).toBe('font-size: 35px;')
      done()
    })
    wrapper.setProps({
      size: '35',
    })
    localVue.nextTick(() => {
      expect(wrapper.find('.checkbox__inner').attributes().style).toBe('font-size: 35px;')
      done()
    })
  })

  it('smaller font for label when long label', done => {
    expect.assertions(1)
    wrapper.setProps({
      label: 'adadsadasdasdasdasda',
    })
    localVue.nextTick(() => {
      expect(wrapper.find('label').attributes().style).toBe('font-size: 11px;')
      done()
    })
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
