<template lang="pug">
  .absolute.flex.flex-center.carousel__left-chevron
    MyBtn(
      @click.native="$emit('changeSlide', currentSlide - 1)"
      icon="chevron_left"
      :disable="currentSlide === 0"
    )
</template>

<script>

import MyBtn from '../Reusable/MyBtn'
export default {
  name: 'CarouselLeftChevron',
  components: { MyBtn },
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
  .carousel__left-chevron
    top 16px
    bottom 16px
    left 12px
</style>
