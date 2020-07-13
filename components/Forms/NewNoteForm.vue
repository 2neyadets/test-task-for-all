<template lang="pug">
  .new-note-form
    h6.mt-none.mb-md Создание новой заметки
    form(@submit.prevent="createNote" style="min-width: 270px;")
      MyInput.mb-lg(
        v-model.trim="form.title"
        label="Название"
        :maxlength="20"
        clearable
        autofocus
      )
      .flex.justify-end
        MyBtn(
          @click.native="$parent.$emit('hide')"
          label="Закрыть"
          size="16"
          flat
        )
        MyBtn.ml-sm(
          type="submit"
          label="Создать"
          :disable="!form.title"
          size="16"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import MyInput from '../Reusable/MyInput'
import MyBtn from '../Reusable/MyBtn'
import { getId } from '../../utils/helpers'

const initialForm = () => ({
  title: null
})

export default {
  name: 'NewNoteForm',
  components: { MyBtn, MyInput },
  props: {},
  data () {
    return {
      form: initialForm(),
    }
  },
  computed: {
    ...mapGetters('notes', [
      'notesArr',
    ]),
  },
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
      const notesArr = [...this.notesArr]
      notesArr.push({ id: getId(), ...this.form })
      this.$store.dispatch('notes/changeNotes', notesArr)
      this.form = { ...this.form, ...initialForm() }
      sessionStorage.removeItem('createNoteForm.title')
      this.$parent.$emit('hide')
    },
  },
}
</script>

<style scoped lang="stylus">
</style>
