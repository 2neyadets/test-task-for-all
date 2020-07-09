import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MyBtn from '../MyBtn'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyBtn component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MyBtn)
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can be round, active, flat, hoverable', done => {
    wrapper.setProps({
      round: true,
      active: true,
      flat: true,
      disable: true,
    })
    localVue.nextTick(() => {
      expect.assertions(4)
      expect(wrapper.classes('my-btn--round')).toBe(true)
      expect(wrapper.classes('my-btn--active')).toBe(true)
      expect(wrapper.classes('my-btn--flat')).toBe(true)
      expect(wrapper.classes('my-btn--hoverable')).toBe(false)
      done()
    })
  })

  it('can be disabled', done => {
    wrapper.setProps({
      disable: true,
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.attributes('disabled')).toBe('disabled')
      done()
    })
  })

  it('can change type', done => {
    wrapper.setProps({
      type: 'submit',
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.attributes('type')).toBe('submit')
      done()
    })
  })

  it('can autofocus', () => {
    const localWrapper = shallowMount(MyBtn, {
      propsData: {
        autofocus: true,
      },
    })
    expect.assertions(1)
    expect(localWrapper.element).toBe(document.activeElement)
  })

  it('can change size', done => {
    expect.assertions(2)
    wrapper.setProps({
      size: 35,
    })
    localVue.nextTick(() => {
      expect(wrapper.find('.full-height').attributes().style).toBe('font-size: 35px;')
      done()
    })
    wrapper.setProps({
      size: '35',
    })
    localVue.nextTick(() => {
      expect(wrapper.find('.full-height').attributes().style).toBe('font-size: 35px;')
      done()
    })
  })

  it('can set label', done => {
    const label = 'Привет!'
    wrapper.setProps({
      label
    })
    localVue.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.html()).toContain(label)
      done()
    })
  })

  it('can set icon', done => {
    const icon = 'cancel'
    wrapper.setProps({
      icon,
    })
    localVue.nextTick(() => {
      expect.assertions(2)
      expect(wrapper.html()).toContain(icon)
      expect(wrapper.find('i').classes('margin-right')).toBe(false)
      done()
    })
  })

  it('can set label and icon together', done => {
    const icon = 'add',
      label = 'Добавить'
    wrapper.setProps({
      icon,
      label,
    })
    localVue.nextTick(() => {
      expect.assertions(3)
      expect(wrapper.find('i').element.tagName).toBe('I')
      expect(wrapper.find('i').classes('margin-right')).toBe(true)
      expect(wrapper.html()).toContain(icon)
      done()
    })
  })

  it('click works', () => {
    wrapper.trigger('click')
    expect.assertions(1)
    expect(wrapper.emitted('click').length).toBe(1)
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
