<template lang="pug">
  label.field.row.no-wrap.items-start(
    :for="id"
    :class="{ 'field--focused': active, 'field--float': active || value }"
  )
    .field__inner.relative-position.col.self-stretch.column.justify-center
      .field__control.relative-position.row.no-wrap(tabindex="-1")
        .field__control-container.col.relative-position.row.no-wrap
          input.field__native(
            :id="id"
            :ref="'input' + id"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @focus="active = true"
            @blur="active = false"
            type="text"
            tabindex="0"
            :maxlength="maxlength"
          )
          .field__label.no-pointer-events.absolute {{label}}
        template(v-if="clearable && value")
          .q-pl-xs.row.no-wrap.items-center(style="font-size: 24px;")
            button.field__focusable-action.material-icons.notranslate(
              @click="$emit('input', null)"
              @focus="active = true"
              class="material-icons"
              aria-hidden="true"
              role="presentation"
              tabindex="0"
              type="button"
            ) close
      template(v-if="maxlength")
        .field__bottom.row.items-start
          .field__messages.col(v-if="hint") {{hint}}
          .field__counter {{value ? value.length : 0}} / {{maxlength}}
</template>

<script>
import { getId } from '../../utils/helpers'

export default {
  name: 'MyInput',
  components: {},
  props: {
    value: {
      type: [String, Object],
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 0,
    },
    hint: {
      type: String,
      default: ' ',
    },
  },
  data () {
    return {
      id: getId(),
      active: false,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    if (this.autofocus) this.$refs['input' + this.id].focus()
  },
  updated () {},
  methods: {},
}
</script>

<style scoped lang="stylus">
  .field

    &__native
      line-height 24px
      color #fff
      width 100%
      min-width 0
      outline 0 !important
      font-weight 400
      letter-spacing 0.00937em
      text-decoration inherit
      text-transform inherit
      border none
      border-radius 0
      background none
      padding: 14px 0 2px

    &__inner
      text-align left

    &--focused .field__control:after
      border-color currentColor
      border-width 2px
      transform scale3d(1, 1, 1)

    &__control
      border-radius 0 !important
      height 40px
      padding 0 12px
      color var(--q-color-primary)
      max-width 100%
      outline none

      &:before
        border: 1px solid rgba(255, 255, 255, 0.6)
        transition border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)

      &:hover:before
        border-color: white

      &:after
        height inherit
        border-radius inherit
        border 2px solid transparent
        transition border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)

      &:before, &:after
        content ''
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        pointer-events none

    &:not(.field--focused) .field__label, .field__focusable-action
      color rgba(255, 255, 255, 0.7)

    &__label
      font-size 14px
      left 0
      right 0
      top 10px
      color rgba(0, 0, 0, 0.6)
      line-height 20px
      font-weight 400
      letter-spacing 0.01em
      text-decoration inherit
      text-transform inherit
      transform-origin left top
      transition transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), right 0.324s cubic-bezier(0.4, 0, 0.2, 1)

    &--float .field__label
      transform translateY(-30%) scale(0.75)
      right calc(-100% / 3)
    &--focused .field__label
      color currentColor

    &__focusable-action
      opacity 0.6
      cursor pointer
      outline 0 !important
      border 0
      color inherit
      background transparent
      padding 0

    &__bottom
      font-size 12px
      min-height 12px
      line-height 1
      padding 6px 8px
      transform translateY(100%)
      position absolute
      left 0
      right 0
      bottom 0
    &__messages
      line-height 1
    &__counter
      padding-left 8px
      line-height 1
</style>
