<template>
  <v-row justify="center">
    <v-col>
      <div v-if="archived.length === 0" class="text-center mt-3">
        You have no archived items
      </div>
      <v-list>
        <template v-for="item in archived">
          <v-list-item v-if="!item.hidden" :key="item.id" two-line class="grey lighten-3">
            <v-list-item-action class="align-self-center">
              <v-row>
                <v-btn fab small class="error mx-2" @click="moveToCart(item.id, item)">
                  <v-icon>
                    mdi-arrow-left
                  </v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>
            <v-list-item-content class="self-justify-center">
              <v-list-item-title>{{ getItem(item.itemId).name }}</v-list-item-title>
              <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
              <v-list-item-subtitle>Cost: {{ item.cost }}€</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              {{ formatDate(item.boughtAt) }}
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="item.id + 'divider'" />
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { format } from 'date-fns'
import { ListItem, listItemStore } from '~/store/listItems'
import { itemStore } from '~/store/items'

@Component
export default class Archived extends Vue {
  get archived () {
    return listItemStore.archived
  }

  get getItem () {
    return (id: string) => itemStore.item(id)
  }

  formatDate (date?: Date) {
    if (!date) { return '' }

    return format(date.getTime(), 'dd. MM. yyyy')
  }

  moveToCart (listItemId: string, listItem: ListItem) {
    const updatedItem: ListItem = {
      ...listItem,
      status: 'bought'
    }

    listItemStore.update({ listId: this.$route.params.listId, listItemId, listItem: updatedItem })
  }
}
</script>

<style lang="postcss" scoped>

</style>
