<template lang="pug">
  Dialog(:value="newNoteDialog" @hide="changeDialogState" @keyup.esc.native="changeDialogState")
    NewNoteForm
</template>

<script>
import { mapGetters } from 'vuex'
import Dialog from '../Reusable/Dialog'
import NewNoteForm from '../Forms/NewNoteForm'

export default {
  name: 'NewNoteDialog',
  components: { Dialog, NewNoteForm },
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'newNoteDialog',
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
