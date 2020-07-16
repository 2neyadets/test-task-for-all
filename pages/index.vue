<template lang="pug">
  .index-page.full-height.flex.flex-center.pa-sm
    .row.full-width
      .col-12.flex.flex-center
        Carousel(v-if="notesArr.length")
      .col-12.px-md.py-sm.flex.flex-center
        MyBtn(
          @click.native="changeDialogState"
          label="Создать заметку"
          icon="add"
        )
    NewNoteDialog
</template>

<script>
import { mapGetters } from 'vuex'
import Carousel from '../components/Carousel/index'
import MyBtn from '../components/Reusable/MyBtn'
import NewNoteDialog from '../components/Dialogs/NewNoteDialog'

export default {
  name: 'IndexPage',
  components: { NewNoteDialog, Carousel, MyBtn },
  data () {
    return {
    }
  },
  computed: {
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
  },
}
</script>

<style scoped lang="stylus">
</style>
