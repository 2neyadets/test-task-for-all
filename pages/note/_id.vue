<template lang="pug">
  .full-height.row.justify-center.pa-sm(:class="currentNote ? 'items-start' : 'items-center'")
    template(v-if="currentNote")
      EditNoteForm(:currentNote="currentNote")
    template(v-else)
      .col-12
        .flex.flex-center
          div Заметки с ID "{{$route.params.id}}" не найдено
        .px-md.py-sm.flex.flex-center
          nuxt-link(to="/")
            Btn(label="На главную")
    CancelEditNoteDialog
</template>

<script>
import { mapGetters } from 'vuex'
import EditNoteForm from '../../components/Forms/EditNoteForm'
import Btn from '../../components/Reusable/MyBtn'
import CancelEditNoteDialog from '../../components/Dialogs/CancelEditNoteDialog'

export default {
  name: 'EditNotePage',
  components: { CancelEditNoteDialog, Btn, EditNoteForm },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('notes', [
      'notesArr',
      'currentNote',
    ]),
  },
  watch: {
    notesArr (v) {
      this.setCurrentNote()
    }
  },
  created () {},
  mounted () {
    this.setCurrentNote()
  },
  updated () {},
  methods: {
    setCurrentNote () {
      const note = this.notesArr.find(note => note.id === this.$route.params.id)
      if (note) this.$store.dispatch('notes/changeCurrentNote', note)
    },
  },
}
</script>

<style scoped lang="stylus">
</style>
