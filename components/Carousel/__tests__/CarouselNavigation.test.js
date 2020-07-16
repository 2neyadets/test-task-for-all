import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CarouselNavigation from '../CarouselNavigation'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CarouselNavigation component', () => {
  let wrapper
  const currentSlide = 1,
    amountOfSlides = 3

  beforeEach(() => {
    wrapper = shallowMount(CarouselNavigation, {
      localVue,
      propsData: {
        currentSlide,
        amountOfSlides,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('render correct amount of navigation btns', async () => {
    expect.assertions(2)
    expect(wrapper.findAll('MyBtn-stub').length).toBe(amountOfSlides)
    wrapper.setProps({
      amountOfSlides: 10
    })
    await localVue.nextTick()
    expect(wrapper.findAll('MyBtn-stub').length).toBe(10)
  })

  it('active slide btn have "active" class', async () => {
    expect.assertions(2)
    const navBtns = wrapper.findAll('MyBtn-stub')
    expect(navBtns.at(1).attributes('active')).toBe('true')
    wrapper.setProps({
      currentSlide: 0
    })
    await localVue.nextTick()
    expect(navBtns.at(1).attributes('active')).toBe(undefined)
  })

  it('can emit "changeSlide" event', () => {
    expect.assertions(3)
    const navBtns = wrapper.findAll('MyBtn-stub')
    navBtns.at(2).trigger('click')
    expect(wrapper.emitted('changeSlide')[0]).toEqual([2])
    navBtns.at(1).trigger('click')
    expect(wrapper.emitted('changeSlide')[1]).toEqual([1])
    navBtns.at(0).trigger('click')
    expect(wrapper.emitted('changeSlide')[2]).toEqual([0])
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
