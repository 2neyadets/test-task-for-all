<template lang="pug">
  .full-height.flex.flex-center.q-pa-sm
    .row.full-width
      .col-12.flex.flex-center
        div Заметки с ID "{{$route.params.id}}" не найдено
      .col-12.q-px-md.q-py-sm.flex.flex-center
        nuxt-link(to="/")
          Btn(label="На главную")
</template>

<script>
// import { mapGetters } from 'vuex'
import Btn from '../components/Reusable/Btn'

export default {
  name: 'EditNotePage',
  components: { Btn },
  data () {
    return {
    }
  },
  computed: {
    // ...mapGetters('notes', [
    //   'notesArr',
    // ]),
  },
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {},
}
</script>

<style scoped lang="stylus">
</style>
