<template>
  <v-row justify="center">
    <v-col>
      <div v-if="required.length === 0" class="text-center mt-3">
        You have no required items
      </div>
      <v-list>
        <template v-for="item in required">
          <v-list-item v-if="!item.hidden" :key="item.id" two-line class="grey lighten-3">
            <v-list-item-action class="align-self-center">
              <v-row>
                <v-btn fab small class="error mx-2">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>
            <v-list-item-content class="self-justify-center">
              <v-list-item-title>{{ getItem(item.itemId).name }}</v-list-item-title>
              <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-row>
                <v-btn icon class="mx-4" @click="hide(item)">
                  <v-icon>mdi-eye-off</v-icon>
                </v-btn>
                <v-btn fab small class="primary mx-2" @click="moveToCart(item.id, item)">
                  <v-icon>mdi-cart-arrow-down</v-icon>
                </v-btn>
              </v-row>
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
import { ListItem, listItemStore } from '~/store/listItems'
import { itemStore } from '~/store/items'

@Component
export default class Cart extends Vue {
  get required () {
    return listItemStore.required
  }

  get getItem () {
    return (id: string) => itemStore.item(id)
  }

  moveToCart (listItemId: string, listItem: ListItem) {
    const updatedItem: ListItem = {
      ...listItem,
      status: 'bought',
      boughtAt: new Date()
    }

    listItemStore.updateItem({ listId: this.$route.params.listId, listItemId, listItem: updatedItem })
  }

  hide (listItem: ListItem) {
    const updatedItem = {
      ...listItem,
      hidden: true
    }
    listItemStore.updateListItem(updatedItem)
  }
}
</script>

<style lang="postcss" scoped>

</style>
