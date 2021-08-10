<template />

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ListDetails extends Vue {
  beforeRouteEnter (to, _, next) {
    next(to.path + '/view')
  }
}
</script>

<style lang="postcss" scoped>

</style>
