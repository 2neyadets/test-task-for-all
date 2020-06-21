<template lang="pug">
  .full-height.flex.flex-center.q-pa-sm
    .row.full-width
      .col-12.flex.flex-center
        Carousel(v-if="$store.getters.notesArr.length")
      .col-12.q-px-md.q-py-sm.flex.flex-center
        Btn(
          @click="changeDialogState"
          label="Создать заметку"
          icon="add"
        )
    Dialog(:value="showDialog" @hide="changeDialogState" @keyup.esc.native="changeDialogState")
      NewNoteForm
</template>

<script>
import Dialog from '../components/Reusable/Dialog'
import NewNoteForm from '../components/Forms/NewNoteForm'
import Carousel from '../components/Carousel/index'
import Btn from '../components/Reusable/Btn'

export default {
  name: 'IndexPage',
  components: { Carousel, NewNoteForm, Dialog, Btn },
  data () {
    return {
      showDialog: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {
    changeDialogState () {
      this.showDialog = !this.showDialog
    },
    fontSizeForTitle (length) {
      if (length <= 10) {
        return 30
      } else {
        return 15
      }
    },
  }
}
</script>

<style scoped lang="stylus">
</style>
