<template lang="pug">
  .carousel.bg-transparent.text-white.shadow-12.rounded-borders.relative-position(style="min-height: 484px;")
    .carousel__wrapper.column.flex-center
      .carousel__slide
        .relative-position.row
          template(v-for="(note, index) in [...$store.getters.notesArr].splice(currentSlide * cardsInSlide, cardsInSlide)")
            .col
              Card(:note="note" :index="index" :key="note.id")
    CarouselNavigation(:currentSlide="currentSlide" @changeSlide="changeSlide" :amountOfSlides="amountOfSlides")
    CarouselLeftChevron(:currentSlide="currentSlide" @changeSlide="changeSlide" :amountOfSlides="amountOfSlides")
    CarouselRightChevron(:currentSlide="currentSlide" @changeSlide="changeSlide" :amountOfSlides="amountOfSlides")
</template>

<script>
import Card from '../Reusable/Card'
import CarouselNavigation from './CarouselNavigation'
import CarouselLeftChevron from './CarouselLeftChevron'
import CarouselRightChevron from './CarouselRightChevron'

export default {
  name: 'Carousel',
  components: { Card, CarouselRightChevron, CarouselLeftChevron, CarouselNavigation },
  data () {
    return {
      currentSlide: 0,
      lastCardsInSlide: 0,
    }
  },
  computed: {
    cardsInSlide () {
      if (this.$store.getters.viewportWidth >= 1024) {
        return 3
      } else if (this.$store.getters.viewportWidth >= 750) {
        return 2
      } else {
        return 1
      }
    },
    amountOfSlides () {
      return Math.ceil(this.$store.getters.notesArr.length / this.cardsInSlide)
    },
  },
  watch: {
    cardsInSlide (v) {
      const isAmountOfCardsIncreased = this.lastCardsInSlide < v
      this.lastCardsInSlide = v
      const lastViewedNoteStartIndex = this.currentSlide * (isAmountOfCardsIncreased ? (v - 1) : (v + 1))
      console.log('lastViewedNoteStartIndex: ', lastViewedNoteStartIndex)
      for (let i = 0; i < this.amountOfSlides; i++) {
        if (lastViewedNoteStartIndex < (i + 1) * v) {
          this.currentSlide = i
          break
        }
      }
    },
    currentSlide (v) {
      localStorage.setItem('currentSlide', JSON.stringify(v))
    },
  },
  created () {},
  mounted () {
    this.lastCardsInSlide = this.cardsInSlide
    const localCurrentSlide = localStorage.getItem('currentSlide') || null
    this.currentSlide = (localCurrentSlide && JSON.parse(localCurrentSlide)) || 0
  },
  updated () {},
  methods: {
    changeSlide (currentSlide) {
      if (currentSlide >= 0 && currentSlide < this.amountOfSlides) this.currentSlide = currentSlide
    }
  },
}
</script>

<style scoped lang="stylus">
  .carousel

    &__wrapper
      padding 16px 50px 50px

    &__slide
      width 100%
      margin 0
      padding 0
      display flex
      justify-content center
      align-items center
      z-index 0
</style>
