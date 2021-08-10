<template>
  <v-row justify="center">
    <v-col sm="12" md="8" lg="6">
      <v-tabs fixed-tabs>
        <v-tab :to="`required`">
          <v-icon>mdi-cart</v-icon>
        </v-tab>
        <v-tab :to="`bought`">
          <v-icon>mdi-receipt</v-icon>
        </v-tab>
        <v-tab :to="`archived`">
          <v-icon>mdi-check-circle</v-icon>
        </v-tab>
      </v-tabs>

      <NuxtChild />

      <v-bottom-navigation
        grow
        absolute
        hide-on-scroll
        color="primary"
      >
        <v-btn :to="`/lists/${$route.params.listId}/view`">
          <span>List</span>
          <v-icon>mdi-playlist-edit</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { itemStore } from '~/store/items'
import { listItemStore } from '~/store/listItems'
import CreateDialog from '~/components/listItems/CreateDialog.vue'

@Component({
  components: { CreateDialog }
})
export default class ListItems extends Vue {
  beforeRouteEnter (to, _, next) {
    if (!to.path.includes('required')) {
      next(to.path + '/required')
    } else {
      next()
    }
  }

  async fetch ({ params }: { params: any }) {
    await itemStore.fetchItems(params.listId)
    await listItemStore.getAll(params.listId)
  }

  get items () {
    return itemStore.items
  }
}
</script>

<style lang="postcss" scoped>

</style>
