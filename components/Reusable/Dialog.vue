<template lang="pug">
  transition(name="slide")
    .q-dialog.fullscreen.no-pointer-events(v-if="value")
      .q-dialog__backdrop.fixed-full(@click="$emit('hide')")
      .q-dialog__inner.flex.no-pointer-events.q-dialog__inner--standard.fixed-full.flex-center(tabindex="-1")
        .q-pa-md.bg-grey-9
          slot
</template>

<script>
export default {
  name: 'Dialog',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {},
}
</script>

<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: transform .3s ease-in-out

  .slide-enter
    transform: translate3d(0, 100%, 0)
  .slide-leave-to
    transform: translate3d(0, 100%, 0)
</style>
