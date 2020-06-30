<template lang="pug">
  .my-checkbox.flex.flex-center
    .checkbox.cursor-pointer.no-outline.row.inline.no-wrap.items-center.checkbox--dark(
      :id="id"
      :ref="'input' + id"
      @click="changeDoneState"
      :class="{ disabled: disable }"
      tabindex="0"
      role="checkbox"
      :aria-checked="task.done"
    )
      .checkbox__inner.relative-position.no-pointer-events(:class="'checkbox__inner' + (task.done ? '--truthy' : '--falsy')" :style="`font-size: ${size}px;`")
        input.hidden.checkbox__native.absolute.ma-none.pa-none.invisible(type="checkbox")
        .checkbox__bg.absolute
          svg.checkbox__svg.fit.absolute-full(
            focusable="false"
            viewBox="0 0 24 24"
          )
            path.checkbox__truthy(
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            )
            path.checkbox__indet(
              d="M4,14H20V10H4"
            )
      span.no-outline(tabindex="-1")
    template(v-if="editable")
      MyInput.ml-sm(
        :value="task.text"
        @input="v => $emit('inputText', v)"
        :label="label"
        style="min-width: 215px;"
        :maxlength="20"
        :clearable="clearable"
      )
    template(v-else)
      label(:for="id" :style="label && label.length > 15 ? 'font-size: 11px;' : ''") {{label}}
</template>

<script>
import { getId } from '../../utils/helpers'
import MyInput from './MyInput'

export default {
  name: 'MyCheckbox',
  components: { MyInput },
  props: {
    task: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: '32',
    },
  },
  data () {
    return {
      id: getId(),
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {
    changeDoneState () {
      this.$emit('inputDone', !this.task.done)
      this.$refs['input' + this.id].blur()
    },
  },
}
</script>

<style scoped lang="stylus">
  $checkbox-transition = .22s cubic-bezier(0,0,.2,1) 0ms
  $option-focus-transition = .22s cubic-bezier(0,0,.2,1)

  .checkbox
    vertical-align middle

    &__bg
      top 25%
      left 25%
      width 50%
      height 50%
      border 2px solid currentColor
      border-radius 2px
      transition background $checkbox-transition
    &__native
      width 1px
      height 1px
    &__svg
      color #fff
    &__truthy
      stroke currentColor
      stroke-width 3.12px
      stroke-dashoffset 29.78334
      stroke-dasharray 29.78334
    &__indet
      fill currentColor
      transform-origin 50% 50%
      transform rotate(-280deg) scale(0)
    &__inner
      font-size 40px
      width 1em
      min-width 1em
      height 1em
      outline 0
      border-radius 50%
      color rgba(0,0,0,.54)
      &--truthy, &--indet
        color $primary
        color var(--color-primary)
        .checkbox__bg
          background currentColor
      &--truthy
        path
          stroke-dashoffset 0
          transition stroke-dashoffset .18s cubic-bezier(.4,0,.6,1) 0ms
      &--indet
        .checkbox__indet
          transform rotate(0) scale(1)
          transition transform $checkbox-transition
    &.disabled
      opacity .75 !important
    &--dark
      .checkbox__inner
        color rgba(255,255,255,.7)
        &:before
          opacity .32 !important
        &--truthy, &--indet
          color $primary
          color var(--color-primary)

    &__indet
      opacity 0
    &__inner--indet .checkbox__indet
      opacity 1

  .checkbox:not(.disabled)
    .checkbox__inner:before
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      border-radius 50%
      background currentColor
      opacity .12
      transform scale3d(0, 0, 1)
      transition transform $option-focus-transition
    &:focus,
    &:hover
      .checkbox__inner:before
        transform scale3d(1, 1, 1)
</style>
