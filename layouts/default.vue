<template>
  <div class="main">
    <Nav />
    <div class="main-content">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Nav from '../components/Nav.vue'

@Component({
  components: { Nav }
})
export default class DefaultLayout extends Vue {
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind utilities;

@layer base {
  .main {
    @apply min-h-screen text-white flex flex-col
  }

  .main-content {
    @apply flex justify-center text-white flex-grow
  }
}
</style>
