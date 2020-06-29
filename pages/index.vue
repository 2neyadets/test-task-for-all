<template lang="pug">
  .index-page.full-height.flex.flex-center.q-pa-sm
    .row.full-width
      .col-12.flex.flex-center
        Carousel(v-if="notesArr.length")
      .col-12.q-px-md.q-py-sm.flex.flex-center
        Btn(
          @click="changeDialogState"
          label="Создать заметку"
          icon="add"
        )
    NewNoteDialog
</template>

<script>
import { mapGetters } from 'vuex'
import Carousel from '../components/Carousel/index'
import Btn from '../components/Reusable/Btn'
import NewNoteDialog from '../components/Dialogs/NewNoteDialog'

export default {
  name: 'IndexPage',
  components: { NewNoteDialog, Carousel, Btn },
  data () {
    return {
      showDialog: false,
    }
  },
  computed: {
    ...mapGetters([
      'newNoteDialog',
      'deleteNoteDialog',
    ]),
    ...mapGetters('notes', [
      'notesArr',
    ]),
  },
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {
    changeDialogState () {
      this.$store.dispatch('changeDialogState', 'newNote')
    },
    fontSizeForTitle (length) {
      if (length <= 10) {
        return 30
      } else {
        return 15
      }
    },
  },
}
</script>

<style scoped lang="stylus">
</style>
