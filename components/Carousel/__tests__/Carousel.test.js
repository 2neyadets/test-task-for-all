import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Carousel from '../index'
import layoutStore from '../../../store/index'
const layoutActions = layoutStore.actions,
  layoutMutations = layoutStore.mutations,
  layoutState = layoutStore.state,
  layoutGetters = layoutStore.getters
import noteStore from '../../../store/notes'
const noteActions = noteStore.actions,
  noteMutations = noteStore.mutations,
  noteState = noteStore.state,
  noteGetters = noteStore.getters

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Carousel component', () => {
  let wrapper, store
  const notesArrVar = [
    {
      id: 'f17351326a68-f48d2c4d',
      title: '11111111111111111111',
    },
    {
      id: 'f17351327bb8-f159ba6c',
      title: '22222222222222222222',
    },
    {
      id: 'f17351328cd9-f20337e2',
      title: '33333333333333333333',
    },
    {
      id: 'f17351326a68-f48d2cdd',
      title: '44444444444444444444',
    },
    {
      id: 'f17351327bb8-f159baee',
      title: '55555555555555555555',
    },
    {
      id: 'f17351328cd9-f20337ff',
      title: '66666666666666666666',
    },
  ]

  beforeEach(() => {
    store = new Vuex.Store({
      actions: layoutActions,
      mutations: layoutMutations,
      state: layoutState,
      getters: layoutGetters,
      modules: {
        notes: {
          namespaced: true,
          actions: noteActions,
          mutations: noteMutations,
          state: noteState,
          getters: noteGetters,
        },
      },
    })

    // init store
    store.dispatch('notes/changeNotes', notesArrVar)
    store.dispatch('screenChanged', { innerWidth: 1024, innerHeight: 768 })

    wrapper = shallowMount(Carousel, {
      localVue,
      store,
    })

    wrapper.setData({
      currentSlide: 0,
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('can change cardsInSlide', async () => {
    expect.assertions(4)
    let cards = wrapper.findAll('Card-stub')
    expect(cards.length).toBe(3)
    wrapper.setData({
      currentSlide: 1,
    })
    await localVue.nextTick()
    store.dispatch('screenChanged', { innerWidth: 800, innerHeight: 768 })
    await localVue.nextTick()
    cards = wrapper.findAll('Card-stub')
    expect(cards.length).toBe(2)
    store.dispatch('screenChanged', { innerWidth: 400, innerHeight: 768 })
    await localVue.nextTick()
    cards = wrapper.findAll('Card-stub')
    expect(cards.length).toBe(1)
    store.dispatch('screenChanged', { innerWidth: 1024, innerHeight: 768 })
    await localVue.nextTick()
    cards = wrapper.findAll('Card-stub')
    expect(cards.length).toBe(3)
  })

  it('can show correct notesForCurrentSlide', async () => {
    expect.assertions(12)
    let notesTitlesArrForFirstSlide = wrapper.vm.notesForCurrentSlide.map(note => note.title)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[0].title)).toBe(true)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[1].title)).toBe(true)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[2].title)).toBe(true)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[3].title)).toBe(false)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[4].title)).toBe(false)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[5].title)).toBe(false)
    wrapper.setData({
      currentSlide: 1,
    })
    await localVue.nextTick()
    notesTitlesArrForFirstSlide = wrapper.vm.notesForCurrentSlide.map(note => note.title)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[0].title)).toBe(false)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[1].title)).toBe(false)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[2].title)).toBe(false)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[3].title)).toBe(true)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[4].title)).toBe(true)
    expect(notesTitlesArrForFirstSlide.includes(notesArrVar[5].title)).toBe(true)
  })

  it('can handle "changeSlide" event', () => {
    expect.assertions(1)
    const rightChevron = wrapper.find('CarouselRightChevron-stub')
    rightChevron.vm.$emit('changeSlide', 2)
    expect(rightChevron.emitted('changeSlide')[0]).toEqual([2])
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
