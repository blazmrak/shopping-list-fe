<template>
  <v-row justify="center">
    <v-col>
      <div v-if="bought.length === 0" class="text-center mt-3">
        You have no bought items
      </div>
      <v-list three-line>
        <template v-for="item in bought">
          <v-list-item :key="item.id" two-line class="grey lighten-3">
            <v-list-item-avatar v-if="isNotBeingEdited(item)" class="align-self-center">
              <v-btn fab class="error" @click="moveToRequired(item.id, item)">
                <v-icon>
                  mdi-arrow-left
                </v-icon>
              </v-btn>
            </v-list-item-avatar>

            <v-list-item-content class="self-justify-center">
              <v-list-item-title>{{ getItem(item.itemId).name }}</v-list-item-title>
              <template v-if="!edit || item.id !== edit.id">
                <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
                <v-list-item-subtitle>Cost: {{ item.cost }}€</v-list-item-subtitle>
              </template>
              <template v-if="isBeingEdited(item)">
                <v-form @submit.prevent="updateAndArchive(edit)">
                  <v-text-field v-model="edit.quantity" autofocus label="Quantity" />
                  <v-text-field
                    v-model="edit.cost"
                    label="Cost"
                    type="number"
                  />
                  <v-row justify="space-between" class="ma-0">
                    <div class="pl-4">
                      <v-btn fab small @click="normalize()">
                        <v-icon color="grey darken-3">
                          <!-- TODO find a reasonable icon-->
                          <!-- mdi-scale-balance-->
                          <!-- mdi-ab-testing-->
                          mdi-scale
                        </v-icon>
                      </v-btn>
                    </div>
                    <div style="display: flex">
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
                    </div>
                  </v-row>
                </v-form>
              </template>
            </v-list-item-content>

            <v-list-item-action v-if="isNotBeingEdited(item)" class="align-self-center">
              <v-row align="center">
                <v-btn fab small class="primary mx-4" @click="startEdit(item)">
                  <v-icon>mdi-pencil</v-icon>
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
export default class Bought extends Vue {
  edit: ListItem | null = null

  get bought () {
    return listItemStore.bought
  }

  get getItem () {
    return (id: string) => itemStore.item(id)
  }

  startEdit (item: ListItem) {
    this.edit = { ...item }
  }

  stopEdit () {
    this.edit = null
  }

  isBeingEdited (item: ListItem) {
    return item.id === this.edit?.id
  }

  isNotBeingEdited (item: ListItem) {
    return item.id !== this.edit?.id
  }

  canNormalize () {
    return this.edit?.cost !== undefined && this.edit.quantity !== undefined
  }

  normalize () {
    if (this.edit?.cost && this.edit.quantity) {
      let costPerUnit = this.edit.cost / this.edit.quantity
      costPerUnit *= 100
      costPerUnit = Math.round(costPerUnit)
      costPerUnit /= 100
      this.edit.cost = costPerUnit
    }
  }

  moveToRequired (listItemId: string, listItem: ListItem) {
    const updatedItem: ListItem = {
      ...listItem,
      status: 'required',
      boughtAt: null
    }

    listItemStore.update({ listId: this.$route.params.listId, listItemId, listItem: updatedItem })
  }

  updateAndArchive (item: ListItem) {
    item.status = 'archived'

    listItemStore.update({
      listId: this.$route.params.listId,
      listItemId: item.id,
      listItem: item
    })

    this.edit = null
  }
}
</script>

<style lang="css" scoped>

</style>
