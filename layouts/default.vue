<template lang="pug">
  div.text-white
    .column(:style="`height: ${viewportHeight}`")
      .col-auto
        header.q-header.bg-grey-8
          .q-toolbar.row.no-wrap.items-center
            div test-task-for-all
          .q-layout__shadow.absolute-full.overflow-hidden.no-pointer-events
      .col
        .main.full-height.overflow-auto.bg-dark
          nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      viewportHeight: '100vh'
    }
  },
  computed: {},
  created () {},
  mounted () {
    window.addEventListener('resize', this.windowResized)
    this.$store.dispatch('getInitialNotesFromStorage')
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResized)
  },
  methods: {
    windowResized (v) {
      console.log('windowResized', v)
      this.viewportHeight = v.target.innerHeight
    },
  },
}
</script>
