<template lang="pug">
  Dialog(:value="deleteNoteDialog" @hide="changeDialogState" @keyup.esc.native="changeDialogState")
    .delete-note-confirm
      h6.mt-none.mb-md(v-html="title" style="text-align: justify;")
      .flex.justify-end
        Btn(
          @click="changeDialogState"
          label="Отменить"
          size="16"
          flat
          autofocus
        )
        Btn.ml-sm(
          @click="deleteNote"
          label="Да, удалить"
          size="16"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import Dialog from '../Reusable/Dialog'
import Btn from '../Reusable/Btn'

export default {
  name: 'DeleteNoteDialog',
  components: { Btn, Dialog },
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'deleteNoteDialog',
    ]),
    ...mapGetters('notes', [
      'currentNote',
    ]),
    title () {
      return `Вы уверены, что хотите <span style='color: red;'>удалить</span> заметку с названием <strong>"${this.currentNote && this.currentNote.title}"</strong>?`
    },
  },
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {
    changeDialogState () {
      this.$store.dispatch('changeDialogState', 'deleteNote')
    },
    deleteNote () {
      this.changeDialogState()
      this.$store.dispatch('notes/deleteNoteAction', this.currentNote.id)
      this.$router.push('/')
    },
  },
}
</script>
