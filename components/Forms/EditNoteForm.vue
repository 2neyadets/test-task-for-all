<template lang="pug">
  form.edit-note-form(v-if="note" @submit.prevent="saveNote")
    .edit-note-form__editable
      MyInput.q-pb-lg(
        :value="note.title"
        @input="v => handleChange(note, 'title', v)"
        label="Название заметки"
        :maxlength="20"
        clearable
      )
      template(v-for="(task, index) in note.tasks")
        .row.flex-center
          MyCheckbox.q-mb-lg(
            @inputDone="v => handleChange(task, 'done', v)"
            @inputText="v => handleChange(task, 'text', v)"
            :task="task"
            :key="task.id + index"
            label="Текст задачи"
            editable
            clearable
          )
          Btn.q-ml-sm.q-mb-lg(
            @click="deleteTask(task.id)"
            icon="delete"
            size="26"
          )
      .flex.flex-center(v-if="isDisableCreateNewTask")
        p Максимальное количество задач для одной заметки - 5
      .flex.flex-center
        Btn(
          @click="addTask"
          label="Добавить задачу"
          icon="add"
          :disable="isDisableCreateNewTask"
          autofocus
        )
    .edit-note-form__actions
      .edit-note-form__actions--normal
        .flex.flex-center
          Btn(
            type="submit"
            label="Сохранить изменения"
            icon="save"
            :disable="!isNoteChanged || isNoteHaveEmptyTextFields"
          )
        .flex.flex-center.q-pt-md
          Btn(
            @click="undoLastChange"
            label="Отменить внесенное изменение"
            icon="clear"
            :disable="!isAllow.undo"
          )
        .flex.flex-center.q-pt-md
          Btn(
            @click="redoLastChange"
            label="Вернуть отменённое изменение"
            icon="repeat"
            :disable="!isAllow.redo"
          )
      .edit-note-form__actions--danger
        .flex.flex-center
          Btn(
            @click="openCancelEditNoteDialog"
            label="Отменить редактирование"
            icon="cancel"
          )
        .flex.flex-center.q-pt-md
          Btn(
            @click="openDeleteDialog"
            label="Удалить заметку"
            icon="delete"
          )
</template>

<script>
import MyInput from '../Reusable/MyInput'
import Btn from '../Reusable/Btn'
import MyCheckbox from '../Reusable/MyCheckbox'
import { getId } from '../../utils/helpers'

export default {
  name: 'EditNoteForm',
  components: { MyCheckbox, Btn, MyInput },
  props: {
    currentNote: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      lastNote: null,
      note: null,
      isAllow: {
        undo: false,
        redo: false,
      },
    }
  },
  computed: {
    isNoteChanged () {
      return JSON.stringify(this.note) !== JSON.stringify(this.currentNote)
    },
    isNoteHaveEmptyTextFields () {
      return !this.note.title || (this.note.tasks && this.note.tasks.some(task => (!task.text)))
    },
    isDisableCreateNewTask () {
      return this.note.tasks && this.note.tasks.length >= 5
    },
  },
  watch: {
    currentNote (v) {
      this.initNotes()
    }
  },
  created () {
    this.initNotes()
  },
  mounted () {
  },
  updated () {},
  methods: {
    initNotes () {
      this.lastNote = JSON.parse(JSON.stringify(this.currentNote))
      this.note = JSON.parse(JSON.stringify(this.currentNote))
    },
    allowUndoAndWriteLastNote () {
      this.isAllow.undo = true
      this.isAllow.redo = false
      this.lastNote = JSON.parse(JSON.stringify(this.note))
    },
    swapNotes () {
      const temp = JSON.parse(JSON.stringify(this.note))
      this.note = JSON.parse(JSON.stringify(this.lastNote))
      this.lastNote = temp
    },
    handleChange (obj, key, v) {
      this.allowUndoAndWriteLastNote()
      obj[key] = v
    },
    addTask () {
      if (!this.note.tasks) this.note = { ...this.note, tasks: [] }
      if (!this.isDisableCreateNewTask) {
        this.note.tasks.push({
          id: getId(),
          done: false,
          text: null,
        })
      }
    },
    deleteTask (taskId) {
      this.allowUndoAndWriteLastNote()
      this.note.tasks.splice(this.note.tasks.findIndex(task => task.id === taskId), 1)
    },
    undoLastChange () {
      this.swapNotes()
      this.isAllow.undo = false
      this.isAllow.redo = true
    },
    redoLastChange () {
      this.swapNotes()
      this.isAllow.undo = true
      this.isAllow.redo = false
    },
    openCancelEditNoteDialog () {
      this.$store.dispatch('changeDialogState', 'cancelEditNote')
    },
    openDeleteDialog () {
      this.$store.dispatch('changeDialogState', 'deleteNote')
    },
    saveNote () {
      if (!this.isNoteChanged || this.isNoteHaveEmptyTextFields) return false
      this.$store.dispatch('notes/updateNoteAction', JSON.parse(JSON.stringify(this.note)))
    },
  },
}
</script>

<style scoped lang="stylus">
  .edit-note-form

    &__editable
      border 1px solid white
      padding 8px
    &__actions

      &--normal
        border 1px solid green
        padding 8px
        margin-top 8px

      &--danger
        border 1px solid red
        padding 8px
        margin-top 8px
</style>