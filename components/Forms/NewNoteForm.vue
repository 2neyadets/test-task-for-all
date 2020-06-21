<template lang="pug">
  .new-note-form
    h6.q-mt-none.q-mb-md Создание новой заметки
    form(@submit.prevent="createNote" style="min-width: 270px;")
      Input(
        v-model.trim="form.title"
        label="Название"
        :maxlength="20"
        clearable
        autofocus
      )
      .q-pt-lg.flex.justify-end
        Btn(
          @click="$parent.$emit('hide')"
          label="Закрыть"
          size="16"
          flat
        )
        Btn.q-ml-sm(
          type="submit"
          label="Создать"
          :disable="!form.title"
          size="16"
        )
</template>

<script>
import Input from '../Reusable/Input'
import { getId } from '../../utils/helpers'
import Btn from '../Reusable/Btn'

const initialForm = () => ({
  title: null
})

export default {
  name: 'NewNoteForm',
  components: { Btn, Input },
  props: {},
  data () {
    return {
      form: initialForm(),
    }
  },
  computed: {},
  watch: {
    'form.title' (v) {
      sessionStorage.setItem('createNoteForm.title', v)
    },
  },
  created () {},
  mounted () {
    const title = sessionStorage.getItem('createNoteForm.title')
    if (title !== 'null') this.form.title = title || null
  },
  updated () {},
  methods: {
    createNote () {
      const notesArr = [...this.$store.getters.notesArr]
      notesArr.push({ id: getId(), ...this.form })
      this.$store.dispatch('changeNotes', notesArr)
      this.form = { ...this.form, ...initialForm() }
      sessionStorage.removeItem('createNoteForm.title')
      this.$parent.$emit('hide')
    },
  }
}
</script>

<style scoped lang="stylus">
</style>
