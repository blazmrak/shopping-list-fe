<template>
  <div>
    <input
      class="text-input"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class FormField extends Vue {
  @Prop({ default: () => '' })
  placeholder: string;

  @Prop({ default: () => 'text' })
  type: string
}
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .text-input {
    @apply px-2 py-1 border-2 rounded outline-none text-black w-full
  }
}
</style>
