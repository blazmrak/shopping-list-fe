<template>
  <div class="navbar">
    <div class="left">
      left
    </div>
    <div class="right">
      right
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Nav extends Vue {
}
</script>

<style lang="postcss" scoped>

.navbar {
  @apply flex justify-between px-2 py-2 bg-purple-600 shadow
}

</style>
