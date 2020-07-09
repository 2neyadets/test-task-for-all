import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MyInput from '../MyInput'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyInput component', () => {
  let wrapper
  const mockId = '1482363367071'

  beforeEach(() => {
    const label = 'Название'
    wrapper = shallowMount(MyInput, {
      propsData: {
        mockId,
        label,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can work with null', done => {
    wrapper.setProps({
      value: null,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.find('input').element.value).toBe('')
      done()
    })
  })

  it('can work with undefined', done => {
    wrapper.setProps({
      value: undefined,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.find('input').element.value).toBe('')
      done()
    })
  })

  it('can work with strings', done => {
    const value = 'value123123'
    wrapper.setProps({
      value,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.find('input').element.value).toBe(value)
      done()
    })
  })

  it('is clearable', done => {
    const value = 'someValue'
    wrapper.setProps({
      value,
      clearable: true,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.find('button').exists()).toBe(true)
      done()
    })
  })

  it('input emit "input" event', () => {
    const value = '111!!!'
    wrapper.find('input').setValue(value)
    expect.assertions(2)
    expect(wrapper.find('input').element.value).toBe(value)
    expect(wrapper.emitted().input[0]).toEqual([value])
  })

  it('clear btn emit "input" event by clicking on it', done => {
    const value = 'someValue'
    wrapper.setProps({
      value,
      clearable: true,
    })
    localVue.nextTick(() => {
      wrapper.find('button').trigger('click')
      expect.assertions(1)
      expect(wrapper.emitted().input[0]).toEqual([null])
      done()
    })
  })

  it('can show max length', done => {
    const value = 'someValue',
      maxlength = 10
    wrapper.setProps({
      value,
      maxlength,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.find('.field__counter').html()).toContain(`${value.length} / ${maxlength}`)
      done()
    })
  })

  it('can show hint', done => {
    const hint = 'Подсказка!'
    wrapper.setProps({
      hint,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.find('.field__messages').html()).toContain(hint)
      done()
    })
  })

  it('can autofocus', () => {
    const localWrapper = shallowMount(MyInput, {
      propsData: {
        label: 'Название',
        autofocus: true,
      },
    })
    expect.assertions(1)
    expect(localWrapper.find('input').element).toBe(document.activeElement)
  })

  it('can be active and not', done => {
    expect.assertions(6)
    expect(wrapper.classes('field--focused')).toBe(false)
    expect(wrapper.classes('field--float')).toBe(false)
    wrapper.find('input').trigger('focus')
    localVue.nextTick(() => {
      expect(wrapper.classes('field--focused')).toBe(true)
      expect(wrapper.classes('field--float')).toBe(true)
      wrapper.find('input').trigger('blur')
      localVue.nextTick(() => {
        expect(wrapper.classes('field--focused')).toBe(false)
        expect(wrapper.classes('field--float')).toBe(false)
        done()
      })
    })
  })

  it('id on checkbox and label', () => {
    expect.assertions(2)
    expect(wrapper.find('label').attributes('for')).toBe(mockId)
    expect(wrapper.find('input').attributes('id')).toBe(mockId)
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
