<template lang="pug">
  .full-width.full-height.flex.flex-center
    .row
      .col-12.text-center
        template(v-if="error.statusCode === 404")
          h1.q-my-none 404
          h5 Страница не найдена
        template(v-else)
          h1 Произошла ошибка
      .col-12
        .q-px-md.q-py-sm.flex.flex-center
          nuxt-link(to="/")
            Btn(label="На главную")
</template>

<script>
import Btn from '../components/Reusable/Btn'
export default {
  name: 'ErrorLayout',
  components: { Btn },
  props: {
    error: {
      type: Object,
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
