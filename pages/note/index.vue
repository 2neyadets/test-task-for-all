<template lang="pug">
  ErrorLayout(:error="{ statusCode: 404 }")
</template>

<script>
import ErrorLayout from '../../layouts/error'
export default {
  name: 'NotePage',
  components: { ErrorLayout },
  props: {
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
