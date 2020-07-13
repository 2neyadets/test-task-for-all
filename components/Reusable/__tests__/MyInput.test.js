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
      localVue,
      propsData: {
        mockId,
        label,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can work with null', async () => {
    expect.assertions(1)
    wrapper.setProps({
      value: null,
    })
    await localVue.nextTick()
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('can work with undefined', async () => {
    expect.assertions(1)
    wrapper.setProps({
      value: undefined,
    })
    await localVue.nextTick()
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('can work with strings', async () => {
    expect.assertions(1)
    const value = 'value123123'
    wrapper.setProps({
      value,
    })
    await localVue.nextTick()
    expect(wrapper.find('input').element.value).toBe(value)
  })

  it('is clearable', async () => {
    expect.assertions(1)
    const value = 'someValue'
    wrapper.setProps({
      value,
      clearable: true,
    })
    await localVue.nextTick()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('input emit "input" event', () => {
    expect.assertions(2)
    const value = '111!!!'
    wrapper.find('input').setValue(value)
    expect(wrapper.find('input').element.value).toBe(value)
    expect(wrapper.emitted().input[0]).toEqual([value])
  })

  it('clear btn emit "input" event by clicking on it', async () => {
    expect.assertions(1)
    const value = 'someValue'
    wrapper.setProps({
      value,
      clearable: true,
    })
    await localVue.nextTick()
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([null])
  })

  it('can show max length', async () => {
    expect.assertions(1)
    const value = 'someValue',
      maxlength = 10
    wrapper.setProps({
      value,
      maxlength,
    })
    await localVue.nextTick()
    expect(wrapper.find('.field__counter').html()).toContain(`${value.length} / ${maxlength}`)
  })

  it('can show hint', async () => {
    expect.assertions(1)
    const hint = 'Подсказка!'
    wrapper.setProps({
      hint,
    })
    await localVue.nextTick()
    expect(wrapper.find('.field__messages').html()).toContain(hint)
  })

  it('can autofocus', () => {
    expect.assertions(1)
    const localWrapper = shallowMount(MyInput, {
      propsData: {
        label: 'Название',
        autofocus: true,
      },
    })
    expect(localWrapper.find('input').element).toBe(document.activeElement)
  })

  it('can be active and not', async () => {
    expect.assertions(6)
    expect(wrapper.classes('field--focused')).toBe(false)
    expect(wrapper.classes('field--float')).toBe(false)
    wrapper.find('input').trigger('focus')
    await localVue.nextTick()
    expect(wrapper.classes('field--focused')).toBe(true)
    expect(wrapper.classes('field--float')).toBe(true)
    wrapper.find('input').trigger('blur')
    await localVue.nextTick()
    expect(wrapper.classes('field--focused')).toBe(false)
    expect(wrapper.classes('field--float')).toBe(false)
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
