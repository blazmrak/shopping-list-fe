<template>
  <NuxtChild />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ListDetails extends Vue {
  beforeRouteEnter (to: any, _: any, next: Function): void {
    next(to.path + '/view')
  }
}
</script>

<style lang="postcss" scoped>

</style>
