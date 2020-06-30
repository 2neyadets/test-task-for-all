<template lang="pug">
  transition(name="slide")
    .dialog.fullscreen.no-pointer-events(v-if="value")
      .dialog__backdrop.fixed-full(@click="$emit('hide')")
      .dialog__inner.flex.no-pointer-events.fixed-full.flex-center(tabindex="-1")
        .pa-md.bg-grey-9
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
  $shadow-color = black
  $elevation-umbra = rgba($shadow-color, .2)
  $elevation-penumbra = rgba($shadow-color, .14)
  $elevation-ambient = rgba($shadow-color, .12)
  $shadow-4 = 0 2px 4px -1px $elevation-umbra, 0 4px 5px $elevation-penumbra, 0 1px 10px $elevation-ambient
  $dimmed-background = rgba(0, 0, 0, .6)

  .slide-enter-active, .slide-leave-active
    transition transform .3s ease-in-out

  .slide-enter
    transform translate3d(0, 100%, 0)
  .slide-leave-to
    transform translate3d(0, 100%, 0)

  .dialog

    &__inner
      outline 0

      > div
        pointer-events all
        overflow auto
        -webkit-overflow-scrolling touch
        will-change scroll-position
        border-radius 4px
        box-shadow $shadow-4

    &__backdrop
      z-index -1
      pointer-events all
      background $dimmed-background
</style>
