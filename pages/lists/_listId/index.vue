<template>
  <NuxtChild />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { bottomNavigationStore } from '~/store/bottomNavigation'

@Component
export default class ListDetails extends Vue {
  beforeRouteEnter (to: any, _: any, next: Function): void {
    if (!to.path.includes('view')) {
      next(to.path + '/view')
    } else {
      next()
    }
  }

  created () {
    bottomNavigationStore.setTabs([
      {
        label: 'list',
        icon: 'mdi-playlist-edit',
        to: `/lists/${this.$route.params.listId}/view`
      },
      {
        label: 'items',
        icon: 'mdi-silverware',
        to: `/lists/${this.$route.params.listId}/items`
      }
    ])
  }

  destroyed () {
    bottomNavigationStore.reset()
  }
}
</script>

<style lang="postcss" scoped>

</style>
