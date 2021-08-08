<template>
  <v-row justify="center">
    <v-col sm="12" md="8" lg="6">
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab :to="`/lists/${$route.params.listId}/required`">
          <v-icon>mdi-cart</v-icon>
        </v-tab>
        <v-tab :to="`/lists/${$route.params.listId}/bought`">
          <v-icon>mdi-receipt</v-icon>
        </v-tab>
        <v-tab :to="`/lists/${$route.params.listId}/archived`">
          <v-icon>mdi-check-circle</v-icon>
        </v-tab>
      </v-tabs>

      <NuxtChild />

      <CreateDialog />
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
  tab = 0

  async fetch ({ params }) {
    await itemStore.fetchItems(params.listId)
    await listItemStore.fetchListItems(params.listId)
  }

  get items () {
    return itemStore.items
  }
}
</script>

<style lang="postcss" scoped>

</style>
