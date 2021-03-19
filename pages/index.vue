<template>
  <div class="container">
    home
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '~/middleware/auth'

@Component({
  middleware: [auth]
})
export default class Index extends Vue {

}
</script>

<style scoped>

</style>
