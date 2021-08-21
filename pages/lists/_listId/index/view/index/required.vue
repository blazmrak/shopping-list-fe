<template>
  <v-row justify="center">
    <v-col>
      <div v-if="required.length === 0" class="text-center mt-3">
        You have no required items
      </div>
      <v-list>
        <template v-for="item in required">
          <v-list-item v-if="!item.hidden" :key="item.id" two-line>
            <v-list-item-action class="align-self-center">
              <v-row>
                <v-btn fab small class="error mx-2" @click="remove(item.id)">
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
    <CreateDialog :show="showDialog" @opened="opened" />
  </v-row>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { ListItem, listItemStore } from '~/store/listItems'
import { itemStore } from '~/store/items'
import CreateDialog from '~/components/listItems/CreateDialog.vue'
import BaseDialogContainer from '~/components/dialog/BaseDialogContainer'

@Component({
  components: { CreateDialog }
})
export default class Cart extends mixins(BaseDialogContainer) {
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

    listItemStore.update({ listId: this.$route.params.listId, listItemId, listItem: updatedItem })
  }

  hide (listItem: ListItem) {
    const updatedItem = {
      ...listItem,
      hidden: true
    }
    listItemStore.updateLocal(updatedItem)
  }

  remove (listItemId: string) {
    listItemStore.delete({ listItemId, listId: this.$route.params.listId })
  }
}
</script>

<style lang="postcss" scoped>

</style>
