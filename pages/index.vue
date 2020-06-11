<template lang="pug">
  .full-height.flex.flex-center
    .q-pa-md.row
      .col-12.flex.flex-center
        template(v-for="note in $store.getters.notesArr")
          .q-pa-sm {{note}}
      .col-12.q-pa-md.flex.flex-center
        Btn(
          @click="changeDialogState"
          label="Создать заметку"
        )
    Dialog(:value="showDialog" @hide="changeDialogState")
      NewNoteForm
</template>

<script>
import Btn from '../components/Reusable/Btn'
import Dialog from '../components/Reusable/Dialog'
import NewNoteForm from '../components/Forms/NewNoteForm'

export default {
  name: 'IndexPage',
  components: { NewNoteForm, Dialog, Btn },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    changeDialogState () {
      this.showDialog = !this.showDialog
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
