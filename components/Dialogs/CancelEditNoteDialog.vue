<template lang="pug">
  Dialog(:value="cancelEditNoteDialog" @hide="changeDialogState" @keyup.esc.native="changeDialogState")
    .delete-note-confirm
      h6.mt-none.mb-md(v-html="title" style="text-align: justify;")
      .flex.justify-end
        Btn(
          @click="changeDialogState"
          label="Нет, редактировать"
          size="16"
          flat
          autofocus
        )
        Btn.ml-sm(
          @click="cancelEditNote"
          label="Да, отменить"
          size="16"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import Dialog from '../Reusable/Dialog'
import Btn from '../Reusable/Btn'

export default {
  name: 'CancelEditNoteDialog',
  components: { Btn, Dialog },
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'cancelEditNoteDialog',
    ]),
    ...mapGetters('notes', [
      'currentNote',
    ]),
    title () {
      return `Вы уверены, что хотите <span style='color: red;'>отменить редактирование</span> заметки с названием <strong>"${this.currentNote && this.currentNote.title}"</strong>?`
    },
  },
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {
    changeDialogState () {
      this.$store.dispatch('changeDialogState', 'cancelEditNote')
    },
    cancelEditNote () {
      this.changeDialogState()
      this.$router.push('/')
    },
  },
}
</script>
