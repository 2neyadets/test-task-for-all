<template lang="pug">
  .absolute.flex.flex-center.carousel__right-chevron
    Btn(
      @click.native="$emit('changeSlide', currentSlide + 1)"
      icon="chevron_right"
      :disable="currentSlide === amountOfSlides - 1"
    )
</template>

<script>

import Btn from '../Reusable/Btn'
export default {
  name: 'CarouselRightChevron',
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
  methods: {},
}
</script>

<style scoped lang="stylus">
  .carousel__right-chevron
    top 16px
    bottom 16px
    right 12px
</style>
