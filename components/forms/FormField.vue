<template>
  <div>
    <input
      class="px-2 py-1 border-2 rounded outline-none text-black w-full"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FormField extends Vue {
  @Prop()
  value?: string

  @Prop({ default: () => '' })
  placeholder?: string

  @Prop({ default: () => 'text' })
  type?: string
}
</script>

<style lang="postcss" scoped>

</style>
