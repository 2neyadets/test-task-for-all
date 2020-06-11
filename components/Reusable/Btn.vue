<template lang="pug">
  button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.text-white.q-focusable.q-hoverable.q-btn--wrap.q-btn--dense(
    v-if="show"
    @click="handleClick"
    :type="type"
    tabindex="0"
    style="font-size: 14px;"
    :class="{ 'q-btn--flat': flat, 'bg-primary': !flat, disabled: disable, 'q-btn--actionable': !disable, 'q-btn--active': active }"
    :disabled="disable"
  )
    span.q-focus-helper
    span.q-btn__wrapper.col.row.q-anchor--skip
      span.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.row
        span.block {{label}}
</template>

<script>
export default {
  name: 'Btn',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    flat: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      active: false,
      show: true,
    }
  },
  methods: {
    handleClick () {
      this.active = true
      setTimeout(() => {
        this.active = false
        this.show = false
        this.$nextTick(function () {
          this.show = true
        })
      }, 300)
      this.$emit('click')
    },
  }
}
</script>
