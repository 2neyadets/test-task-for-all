<template lang="pug">
  label.q-field.q-validation-component.row.no-wrap.items-start.q-input.q-field--outlined.q-field--labeled.q-field--dense.q-field--dark(
    :for="id"
    :class="{ 'q-field--focused': active, 'q-field--float': active || value }"
  )
    .q-field__inner.relative-position.col.self-stretch.column.justify-center
      .q-field__control.relative-position.row.no-wrap(tabindex="-1")
        .q-field__control-container.col.relative-position.row.no-wrap.q-anchor--skip
          input.q-field__native.q-placeholder(
            :id="id"
            :value="value"
            @input="handleInput"
            @focus="active = true"
            @blur="active = false"
            type="text"
            tabindex="0"
            aria-label="Outlined"
          )
          .q-field__label.no-pointer-events.absolute.ellipsis {{label}}
        template(v-if="clearable && value")
          .q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip
            button.q-field__focusable-action.material-icons.q-icon.notranslate(
              @click="handleInput({ target: { value: null } })"
              @focus="active = true"
              class="material-icons"
              aria-hidden="true"
              role="presentation"
              tabindex="0"
              type="button"
            ) close
</template>

<script>
import { getId } from '../../utils/helpers'

export default {
  name: 'Input',
  props: {
    value: {
      type: String || Object,
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
  },
  data () {
    return {
      id: getId(),
      active: false,
    }
  },
  computed: {},
  watch: {},
  mounted () {},
  updated () {},
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  },
}
</script>
