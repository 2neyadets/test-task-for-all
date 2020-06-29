<template lang="pug">
  .card.q-ma-sm(:class="'index' + index")
    .content.full-width.full-height.column
      .col-auto
        h2(:style="`font-size: ${fontSizeForTitle(note.title.length)}px;`")
          span {{note.title}}
      .col.q-py-sm.column.items-center(:class="note.tasks && note.tasks.length ? 'justify-between' : 'justify-center'")
        template(v-if="note.tasks && note.tasks.length")
          .col.full-width.row.justify-start.items-center(style="font-size: 12px;")
            template(v-for="(task, index) in note.tasks")
              .col-12.flex.justify-start
                MyCheckbox(
                  :key="task.id + index"
                  :task="task"
                  :label="task.text"
                  disable
                )
        template(v-else)
          p В заметке пока нет задач.
      .col-auto
        .flex.justify-between
          Btn(@click="openEditNotePage(note.id)" size="46" icon="edit")
          Btn(@click="openDeleteDialog" size="46" icon="delete")
</template>

<script>
import DeleteNoteConfirm from '../Dialogs/DeleteNoteDialog'
import Btn from './Btn'
import Dialog from './Dialog'
import MyCheckbox from './MyCheckbox'

export default {
  name: 'Card',
  components: { MyCheckbox, DeleteNoteConfirm, Dialog, Btn },
  props: {
    note: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  data () {
    return {
      showDialog: false,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {
    openEditNotePage (id) {
      this.$store.dispatch('notes/changeCurrentNote', null)
      this.$router.push(`/${id}`)
    },
    openDeleteDialog () {
      this.$store.dispatch('notes/changeCurrentNote', this.note)
      this.$store.dispatch('changeDialogState', 'deleteNote')
    },
    fontSizeForTitle (length) {
      if (length <= 10) {
        return 30
      } else {
        return 15
      }
    },
  },
}
</script>

<style scoped lang="stylus">
  .card
    position relative
    min-height 400px
    width 288px
    background #060c21
    display flex
    justify-content center
    align-items center
    border 1px solid black

    &:before
      content ''
      position absolute
      top -2px
      left -2px
      right -2px
      bottom -2px
      background white
      transform skew(2deg, 2deg)
      z-index -1

    &.index0:before
      background linear-gradient(315deg, #ff0057, #e64a19)

    &.index1:before
      background linear-gradient(315deg, #89ff00, #00bcd4)

    &.index2:before
      background linear-gradient(315deg, #e91e63, #5d02ff)

    &.index3:before
      background linear-gradient(315deg, #ff0000, #ffc107)

    &:after
      content ''
      position absolute
      top 0
      left 0
      width 50%
      height 100%
      background rgba(255, 255, 255, .05)
      pointer-events none

    .content
      position relative
      min-height 400px
      padding 16px
      transform translateY(0)

      h2
        position relative
        max-height 60px
        top 8px
        right 0
        margin 0
        padding 0
        color rgba(255, 255, 255, .35)
        transition .5s

      p
        margin 0
        padding 0
        color white
        font-size 16px

    &:hover

      .content

        h2
          top 0

        .my-btn
          transform translateY(0)
          opacity 1
          visibility visible
</style>
