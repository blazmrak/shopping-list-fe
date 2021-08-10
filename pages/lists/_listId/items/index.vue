<template>
  <v-row justify="center">
    <v-col sm="12" md="8" lg="6">
      <div v-if="items.length === 0" class="text-center mt-3">
        You have no items
      </div>
      <v-list>
        <template v-for="item in items">
          <v-list-item
            :key="item.id"
            class="grey lighten-3"
          >
            <v-list-item-action
              v-if="isNotBeingEdited(item)"
              class="align-self-center"
            >
              <v-row>
                <v-btn fab small class="error mx-2" @click="removeItem(item.id)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>
            <v-list-item-content class="self-justify-center">
              <v-list-item-title v-if="isNotBeingEdited(item)">
                {{ item.name }}
              </v-list-item-title>
              <template v-if="!isNotBeingEdited(item)">
                <v-form @submit.stop.prevent="update(edit)">
                  <v-text-field v-model="edit.name" autofocus label="Name" />
                  <v-row justify="end" class="ma-0">
                    <div class="pr-4">
                      <v-btn fab small class="error" @click="stopEdit()">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <div class="pr-4">
                      <v-btn fab small class="primary" type="submit">
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-form>
              </template>
            </v-list-item-content>
            <v-list-item-action v-if="isNotBeingEdited(item)">
              <v-btn
                fab
                small
                color="primary"
                @click="editItem(item)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="item.id + 'divider'" />
        </template>
      </v-list>

      <BottomNavigation />
      <CreateDialog :show="showDialog" @opened="opened" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Item, itemStore } from '~/store/items'
import CreateDialog from '~/components/listItems/items/CreateDialog.vue'
import { BaseDialogContainer } from '~/components/dialog/BaseDialogContainer'
import BottomNavigation from '~/components/listItems/BottomNavigation.vue'

@Component({
  components: { BottomNavigation, CreateDialog }
})
export default class Items extends mixins(BaseDialogContainer) {
  edit: Item | null = null

  fetch () {
    itemStore.fetchItems(this.$route.params.listId)
  }

  get items () {
    return itemStore.items
  }

  removeItem (itemId: string) {
    console.log(itemId)
  }

  async update (item: Item) {
    try {
      await itemStore.update({ listId: this.$route.params.listId, itemId: item.id, item })
      this.stopEdit()
    } catch (e) {
      console.error(e)
    }
  }

  editItem (item: Item) {
    this.edit = { ...item }
  }

  stopEdit () {
    this.edit = null
  }

  isNotBeingEdited (item: Item) {
    return item.id !== this.edit?.id
  }
}
</script>

<style lang="css" scoped>

</style>
