<template lang="pug">
  .text-white
    .column(:style="`height: ${viewportHeightLayout};`")
      .col-auto
        header.header.bg-grey-8
          .toolbar.row.justify-between.items-center.no-wrap
            nuxt-link.text-white(to="/") test-task-for-all
            template(v-if="viewportWidth === '100vw' || viewportWidth >= 420")
              nuxt-link.text-white(to="/task") Задание
            a.text-white(href="mailto:avsintsov91@gmail.com")
              i.material-icons mail
              span.px-sm avsintsov91@gmail.com
          .layout__shadow.absolute-full.overflow-hidden.no-pointer-events
      .col
        .main.full-height.overflow-auto.bg-dark
          nuxt
    DeleteNoteDialog
</template>

<script>
import { mapGetters } from 'vuex'
import DeleteNoteDialog from '../components/Dialogs/DeleteNoteDialog'

export default {
  name: 'DefaultLayout',
  components: { DeleteNoteDialog },
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'viewportHeight',
      'viewportWidth',
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
      if (e !== undefined) this.$store.dispatch('screenChanged', isWindow ? e : e.target)
    },
  },
}
</script>

<style scoped lang="stylus">
  .header
    position relative
    z-index 2000
    font-size 14px

    .layout__shadow
      bottom -10px
      &:after
        bottom 10px

  .toolbar
    position relative
    padding 0 12px
    min-height 50px
    width 100%

  .layout__shadow
    width 100%

    &:after
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      box-shadow 0 0 10px 2px rgba(0,0,0,0.2), 0 0px 10px rgba(0,0,0,0.24)
</style>
