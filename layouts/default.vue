<template>
  <div class="flex flex-col min-h-screen text-white">
    <Nav />
    <div class="flex-auto flex justify-center text-white">
      <Nuxt />
    </div>
    <div class="flex-none bg-purple-600 h-6" />
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

</style>
