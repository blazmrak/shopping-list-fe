<template>
  <div>
    home
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: ['auth']
})
export default class Index extends Vue {

}
</script>

<style scoped>

</style>
