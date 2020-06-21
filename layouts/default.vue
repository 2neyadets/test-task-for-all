<template lang="pug">
  div.text-white
    .column(:style="`height: ${viewportHeight};`")
      .col-auto
        header.q-header.bg-grey-8
          .q-toolbar.row.justify-between.items-center.no-wrap
            div test-task-for-all
          .q-layout__shadow.absolute-full.overflow-hidden.no-pointer-events
      .col
        .main.full-height.overflow-auto.bg-dark
          nuxt
</template>

<script>

export default {
  name: 'DefaultLayout',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {
    viewportHeight () {
      const height = this.$store.getters.viewportHeight
      // console.log(1111, typeof height === 'string' ? height : height + 'px')
      return typeof height === 'string' ? height : height + 'px'
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.windowResized(window, true)
    window.addEventListener('resize', this.windowResized)
    this.$store.dispatch('getInitialNotesFromStorage')
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
