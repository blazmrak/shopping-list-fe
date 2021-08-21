<template>
  <v-row justify="center">
    <v-col sm="12" md="8" lg="6">
      <NuxtChild />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { RouteConfig } from '@nuxt/types/config/router'
import { itemStore } from '~/store/items'
import { listItemStore } from '~/store/listItems'
import CreateDialog from '~/components/listItems/CreateDialog.vue'
import BottomNavigation from '~/components/navigation/BottomNavigation.vue'
import { tabsStore } from '~/store/tabs'

@Component({
  components: { BottomNavigation, CreateDialog }
})
export default class ListItems extends Vue {
  beforeRouteEnter (to: RouteConfig, _: RouteConfig, next: Function) {
    if (to.path.endsWith('/view')) {
      next(to.path + '/required')
    } else {
      next()
    }
  }

  async fetch ({ params }: { params: any }) {
    tabsStore.setTabs([
      { icon: 'mdi-cart', to: 'required' },
      { icon: 'mdi-receipt', to: 'bought' },
      { icon: 'mdi-check-circle', to: 'archived' }
    ])

    await Promise.all([
      itemStore.fetchItems(params.listId),
      listItemStore.fetchAll(params.listId)
    ])
  }

  destroyed () {
    tabsStore.reset()
  }
}
</script>

<style lang="postcss" scoped>

</style>
