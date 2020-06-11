<template lang="pug">
  form(@submit.prevent="createNote" style="min-width: 270px;")
    Input(
      v-model="form.title"
      label="Название"
      :clearable="true"
    )
    .q-pt-sm.flex.justify-end
      Btn(@click="$parent.$emit('hide')" label="Закрыть" :flat="true")
      Btn.q-ml-sm(label="Создать" type="submit" :disable="!form.title")
</template>

<script>
import Btn from '../Reusable/Btn'
import Input from '../Reusable/Input'
import { getId } from '../../utils/helpers'

const initialForm = () => ({
  title: null
})

export default {
  name: 'NewNoteForm',
  components: { Input, Btn },
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
      sessionStorage.removeItem('createNoteForm.title')
      this.form = initialForm()
      this.$parent.$emit('hide')
    },
  }
}
</script>

<style scoped lang="stylus">
</style>
