<template lang="pug">
  button.my-btn(
    @click="$emit('click')"
    :ref="'button' + id"
    :type="type"
    role="button"
    tabindex="0"
    :class="btnClass"
    :disabled="disable"
  )
    .full-height.row.items-center(:style="`font-size: ${size}px;`")
      template(v-if="icon")
        .col-auto.flex.flex-center
          i.material-icons(
            :class="label ? 'margin-right' : ''"
          ) {{icon}}
      .col {{label}}
</template>

<script>
import { getId } from '../../assets/helpers'

export default {
  name: 'MyBtn',
  components: {},
  props: {
    type: {
      type: String,
      default: 'button',
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: 20,
    },
    round: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      id: getId(),
    }
  },
  computed: {
    btnClass () {
      return {
        'my-btn--hoverable': !this.disable,
        'my-btn--flat': this.flat,
        'my-btn--round': this.round,
        'my-btn--active': this.active,
      }
    },
  },
  watch: {},
  created () {},
  mounted () {
    if (this.autofocus) this.$refs['button' + this.id].focus()
  },
  updated () {},
  methods: {},
}
</script>

<style scoped lang="stylus">
  .my-btn
    display inline-flex
    flex-direction column
    align-items stretch
    position relative
    outline 0
    border 1px solid white
    vertical-align middle
    padding 6px
    font-size 14px
    line-height 1.715em
    text-decoration none
    color white
    background transparent
    font-weight 500
    text-transform uppercase
    text-align center
    width auto
    height auto
    transition .5s

    &--hoverable:hover, &--hoverable:focus
      color black
      background white
    &--flat
      border 0
      &:hover, &:focus
        color inherit
        background rgba(255, 255, 255, .15)
    &--round
      border-radius 50%
    &--active
      color black
      background white
  .margin-right
    margin-right 12px
</style>
