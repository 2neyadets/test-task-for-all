<template lang="pug">
  .absolute.flex.carousel__navigation
    .carousel__navigation-inner.flex.justify-center
      template(v-for="(slide, index) in amountOfSlides")
        Btn.q-mx-xs(
          @click.native="$emit('changeSlide', index)"
          icon="brightness_1"
          :size="12"
          :active="index === currentSlide"
          round
        )
</template>

<script>

import Btn from '../Reusable/Btn'
export default {
  name: 'CarouselNavigation',
  components: { Btn },
  props: {
    currentSlide: {
      type: Number,
      required: true,
    },
    amountOfSlides: {
      type: Number,
      required: true,
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
  beforeDestroy () {},
  methods: {},
}
</script>

<style scoped lang="stylus">
  .carousel__navigation
    left 16px
    right 16px
    bottom 16px
    overflow-x auto
    overflow-y hidden

    &-inner
      flex 1 1 auto
</style>
