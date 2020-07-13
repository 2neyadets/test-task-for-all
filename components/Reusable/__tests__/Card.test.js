import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Card from '../Card'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

describe('Card component', () => {
  let wrapper, actions, store

  const note = {
      id: 'f17304bfb263-f99f3c6',
      title: 'Название заметки',
    },
    index = 0,
    tasks = [
      {
        done: false,
        id: 'f17332538b67-f47c711',
        text: 'Текст задачи 1',
      },
    ]

  beforeEach(() => {
    actions = {
      'notes/changeCurrentNote': jest.fn(),
      changeDialogState: jest.fn(),
    }
    store = new Vuex.Store({
      actions
    })

    wrapper = shallowMount(Card, {
      localVue,
      store,
      router,
      propsData: {
        note,
        index,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('have corresponding class', () => {
    expect.assertions(1)
    expect(wrapper.classes(`index${index}`)).toBe(true)
  })

  it('includes note title', () => {
    expect.assertions(1)
    expect(wrapper.find('h2').html()).toContain(note.title)
  })

  it('can change font-size of title', async () => {
    expect.assertions(2)
    expect(wrapper.find('h2').attributes().style).toBe('font-size: 15px;')
    wrapper.setProps({
      note: {
        ...note,
        title: 'Название',
      },
    })
    await localVue.nextTick()
    expect(wrapper.find('h2').attributes().style).toBe('font-size: 25px;')
  })

  it('can show "no tasks" message and have corresponding class', () => {
    expect.assertions(2)
    expect(wrapper.find('.card__inner').classes('justify-center')).toBe(true)
    expect(wrapper.find('p').html()).toContain('В заметке пока нет задач.')
  })

  it('can show tasks', async () => {
    expect.assertions(6)
    expect(wrapper.find('.card__inner').classes('justify-between')).toBe(false)
    expect(wrapper.find('.tasks').exists()).toBe(false)
    wrapper.setProps({
      note: {
        ...note,
        tasks
      },
    })
    await localVue.nextTick()
    expect(wrapper.find('.card__inner').classes('justify-between')).toBe(true)
    expect(wrapper.find('.tasks').exists()).toBe(true)
    expect(wrapper.find('.task').exists()).toBe(true)
    expect(wrapper.find('MyCheckbox-stub').exists()).toBe(true)
  })

  it('call "openEditNotePage" when click on edit btn', () => {
    expect.assertions(2)
    wrapper.findAll('MyBtn-stub').at(0).trigger('click')
    expect(actions['notes/changeCurrentNote']).toHaveBeenCalled()
    expect(router.currentRoute.fullPath).toBe(`/note/${note.id}`)
  })

  it('call "openDeleteDialog" when click on delete btn', () => {
    expect.assertions(2)
    wrapper.findAll('MyBtn-stub').at(1).trigger('click')
    expect(actions['notes/changeCurrentNote']).toHaveBeenCalled()
    expect(actions.changeDialogState).toHaveBeenCalled()
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
