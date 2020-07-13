import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import EditNoteForm from '../EditNoteForm'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditNoteForm component', () => {
  let wrapper, actions, noteGetters, store
  const currentNote = {
    id: 'f1733253812c-f300272d',
    title: 'Название заметки',
  }

  beforeEach(() => {
    actions = {
      'notes/updateNoteAction': jest.fn(),
      changeDialogState: jest.fn(),
    }
    noteGetters = {
      notesArr: () => [],
    }
    store = new Vuex.Store({
      actions,
      modules: {
        notes: {
          namespaced: true,
          getters: noteGetters,
        },
      },
    })

    wrapper = shallowMount(EditNoteForm, {
      localVue,
      store,
      propsData: {
        currentNote,
      },
    })
  })

  it('mounts without errors', done => {
    localVue.config.errorHandler = done // для отлавливания ошибок внутри nextTick, если нужно что-то выпонять внутри него
    expect.assertions(1)
    expect(wrapper).toBeTruthy()
    done()
  })

  it('cant create task when have 5 tasks', async () => {
    expect.assertions(1)
    wrapper.setData({
      note: { ...currentNote, tasks: [{}, {}, {}, {}, {}], }
    })
    await localVue.nextTick()
    wrapper.vm.addTask()
    expect(wrapper.vm.$data.note.tasks.length).toBe(5)
  })

  it('can create task', async () => {
    expect.assertions(2)
    const btn = wrapper.find('.add-task-btn')
    btn.trigger('click')
    expect(wrapper.vm.$data.note.tasks.length).toBe(1)
    await localVue.nextTick()
    expect(wrapper.find('.task').exists()).toBe(true)
  })

  it('can delete task', async () => {
    expect.assertions(2)
    wrapper.setData({
      note: {
        id: 'f1733253812c-f300272d',
        title: 'Название заметки',
        tasks: [
          {
            done: false,
            id: 'f173325392ff-f4a0c9a4',
            text: 'Текст задачи',
          }
        ],
      }
    })
    await localVue.nextTick()
    expect(wrapper.find('.task').exists()).toBe(true)
    const btn = wrapper.find('.task__delete-btn')
    btn.trigger('click')
    await localVue.nextTick()
    expect(wrapper.find('.task').exists()).toBe(false)
  })

  it('can save changes', async () => {
    expect.assertions(1)
    wrapper.setData({
      note: {
        id: 'f1733253812c-f300272d',
        title: 'Новое название',
      }
    })
    await localVue.nextTick()
    const btn = wrapper.find('.save-changes-btn')
    btn.trigger('submit')
    expect(actions['notes/updateNoteAction']).toHaveBeenCalled()
  })

  it('can undo change', async () => {
    expect.assertions(1)
    wrapper.setData({
      note: {
        id: 'f1733253812c-f300272d',
        title: 'asdasdsadasdasdasd',
      }
    })
    await localVue.nextTick()
    const btn = wrapper.find('.undo-btn')
    btn.trigger('click')
    await localVue.nextTick()
    expect(wrapper.vm.$data.note).toEqual(currentNote)
  })

  it('can redo change after undo', async () => {
    expect.assertions(7)
    const firstChange = 'first',
      secondChange = 'second',
      myInput = wrapper.find('MyInput-stub'),
      undoBtn = wrapper.find('.undo-btn'),
      redoBtn = wrapper.find('.redo-btn')
    myInput.vm.$emit('input', firstChange)
    expect(myInput.exists()).toBe(true)
    expect(undoBtn.exists()).toBe(true)
    expect(redoBtn.exists()).toBe(true)
    await localVue.nextTick()
    expect(wrapper.vm.$data.note.title).toBe(firstChange)
    myInput.vm.$emit('input', secondChange)
    await localVue.nextTick()
    expect(wrapper.vm.$data.note.title).toBe(secondChange)
    undoBtn.trigger('click')
    await localVue.nextTick()
    expect(wrapper.vm.$data.note.title).toBe(firstChange)
    redoBtn.trigger('click')
    await localVue.nextTick()
    expect(wrapper.vm.$data.note.title).toBe(secondChange)
  })

  it('watcher on currentNote works', async () => {
    expect.assertions(2)
    const newNote = { ...currentNote, title: 'новое название' }
    wrapper.setProps({
      currentNote: newNote,
    })
    await localVue.nextTick()
    expect(wrapper.vm.$data.note).toEqual(newNote)
    expect(wrapper.vm.$data.lastNote).toEqual(newNote)
  })

  it('can open "cancel edit" dialog', () => {
    expect.assertions(1)
    const btn = wrapper.find('.cancel-edit-btn')
    btn.trigger('click')
    expect(actions.changeDialogState).toHaveBeenCalled()
  })

  it('can open "delete note" dialog', () => {
    expect.assertions(1)
    const btn = wrapper.find('.delete-note-btn')
    btn.trigger('click')
    expect(actions.changeDialogState).toHaveBeenCalled()
  })

  it('match snapshot', () => {
    expect.assertions(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
