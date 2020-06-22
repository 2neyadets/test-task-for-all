<template lang="pug">
  div.text-white
    .column(:style="`height: ${viewportHeightLayout};`")
      .col-auto
        header.q-header.bg-grey-8
          .q-toolbar.row.justify-between.items-center.no-wrap
            nuxt-link.text-white(to="/") test-task-for-all
            a.text-white(href="mailto:avsintsov91@gmail.com")
              i.material-icons mail
              span.q-px-sm avsintsov91@gmail.com
          .q-layout__shadow.absolute-full.overflow-hidden.no-pointer-events
      .col
        .main.full-height.overflow-auto.bg-dark
          nuxt
    NewNoteDialog
    DeleteNoteDialog
</template>

<script>
import { mapGetters } from 'vuex'
import NewNoteDialog from '../components/Dialogs/NewNoteDialog'
import DeleteNoteDialog from '../components/Dialogs/DeleteNoteDialog'

export default {
  name: 'DefaultLayout',
  components: { NewNoteDialog, DeleteNoteDialog },
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'viewportHeight',
    ]),
    viewportHeightLayout () {
      return typeof this.viewportHeight === 'string'
        ? this.viewportHeight
        : this.viewportHeight + 'px'
    },
  },
  watch: {},
  created () {},
  mounted () {
    this.windowResized(window, true)
    window.addEventListener('resize', this.windowResized)
    this.$store.dispatch('notes/getInitialNotesFromStorage')
  },
  updated () {},
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResized)
  },
  methods: {
    windowResized (e, isWindow = false) {
      // console.log('windowResized', e)
      if (e !== undefined) this.$store.dispatch('screenChanged', isWindow ? e : e.target)
    },
  },
}
</script>
