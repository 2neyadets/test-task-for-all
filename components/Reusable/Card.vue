<template lang="pug">
  .card.q-ma-sm(:class="'index' + index")
    .content.full-height.column
      .col-auto
        div(style="height: 90px;")
          h2(:style="`font-size: ${fontSizeForTitle(note.title.length)}px;`")
            span {{note.title}}
      .col.row.flex-center
        p Чтобы изменить или удалить заметку, наведите на карточку
      .col-auto
        .flex.justify-between
          nuxt-link(:to="note.id")
            Btn(@click="editNote" size="46" icon="edit")
          Btn(@click="openDeleteDialog" size="46" icon="delete")
</template>

<script>
import DeleteNoteConfirm from '../Dialogs/DeleteNoteDialog'
import Btn from './Btn'
import Dialog from './Dialog'

export default {
  name: 'Card',
  components: { DeleteNoteConfirm, Dialog, Btn },
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
    editNote () {
      console.log('editNote')
    },
  },
}
</script>

<style scoped lang="stylus">
  .card
    position relative
    min-height 400px
    min-width 200px
    max-width 288px
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
        top 30px
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

      .my-btn
        transform translateY(-30px)
        opacity 0
        visibility hidden
        transition .5s

    &:hover

      .content

        h2
          top 0

        .my-btn
          transform translateY(0)
          opacity 1
          visibility visible
</style>
