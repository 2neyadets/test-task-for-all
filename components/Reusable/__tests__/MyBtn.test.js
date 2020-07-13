import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MyBtn from '../MyBtn'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyBtn component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MyBtn, {
      localVue,
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can be round, active, flat, hoverable', async () => {
    expect.assertions(4)
    wrapper.setProps({
      round: true,
      active: true,
      flat: true,
      disable: true,
    })
    await localVue.nextTick()
    expect(wrapper.classes('my-btn--round')).toBe(true)
    expect(wrapper.classes('my-btn--active')).toBe(true)
    expect(wrapper.classes('my-btn--flat')).toBe(true)
    expect(wrapper.classes('my-btn--hoverable')).toBe(false)
  })

  it('can be disabled', async () => {
    expect.assertions(1)
    wrapper.setProps({
      disable: true,
    })
    await localVue.nextTick()
    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  it('can change type', async () => {
    expect.assertions(1)
    wrapper.setProps({
      type: 'submit',
    })
    await localVue.nextTick()
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('can autofocus', () => {
    expect.assertions(1)
    const localWrapper = shallowMount(MyBtn, {
      propsData: {
        autofocus: true,
      },
    })
    expect(localWrapper.element).toBe(document.activeElement)
  })

  it('can change size', async () => {
    expect.assertions(2)
    wrapper.setProps({
      size: 35,
    })
    await localVue.nextTick()
    expect(wrapper.find('.full-height').attributes().style).toBe('font-size: 35px;')
    wrapper.setProps({
      size: '35',
    })
    await localVue.nextTick()
    expect(wrapper.find('.full-height').attributes().style).toBe('font-size: 35px;')
  })

  it('can set label', async () => {
    expect.assertions(1)
    const label = 'Привет!'
    wrapper.setProps({
      label
    })
    await localVue.nextTick()
    expect(wrapper.html()).toContain(label)
  })

  it('can set icon', async () => {
    expect.assertions(2)
    const icon = 'cancel'
    wrapper.setProps({
      icon,
    })
    await localVue.nextTick()
    expect(wrapper.html()).toContain(icon)
    expect(wrapper.find('i').classes('margin-right')).toBe(false)
  })

  it('can set label and icon together', async () => {
    expect.assertions(3)
    const icon = 'add',
      label = 'Добавить'
    wrapper.setProps({
      icon,
      label,
    })
    await localVue.nextTick()
    expect(wrapper.find('i').element.tagName).toBe('I')
    expect(wrapper.find('i').classes('margin-right')).toBe(true)
    expect(wrapper.html()).toContain(icon)
  })

  it('click works', () => {
    expect.assertions(1)
    wrapper.trigger('click')
    expect(wrapper.emitted('click').length).toBe(1)
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
