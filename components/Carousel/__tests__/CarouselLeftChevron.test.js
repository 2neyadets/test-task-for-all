import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CarouselLeftChevron from '../CarouselLeftChevron'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CarouselLeftChevron component', () => {
  let wrapper
  const currentSlide = 1,
    amountOfSlides = 3

  beforeEach(() => {
    wrapper = shallowMount(CarouselLeftChevron, {
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

  it('can emit "changeSlide" event', () => {
    expect.assertions(2)
    wrapper.find('MyBtn-stub').trigger('click')
    expect(wrapper.emitted('changeSlide').length).toBe(1)
    expect(wrapper.emitted('changeSlide')[0]).toEqual([currentSlide - 1])
  })

  it('can be disabled', async () => {
    expect.assertions(1)
    wrapper.setProps({
      currentSlide: 0,
    })
    await localVue.nextTick()
    expect(wrapper.find('MyBtn-stub').attributes().disable).toBe('true')
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
