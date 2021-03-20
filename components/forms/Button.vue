<template>
  <button class="btn">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: () => 'Button' })
  text: string | undefined
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply text-center rounded py-1
}
</style>
