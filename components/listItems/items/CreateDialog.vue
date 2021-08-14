<template>
  <v-dialog
    :value="show"
    max-width="600px"
    @input="opened"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        fab
        large
        bottom
        right
        absolute
        style="margin-bottom: 104px"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">New Item</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="newItem.name"
              label="Name"
              type="text"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="opened(false)"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="createNewItem()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Item, itemStore } from '~/store/items'
import BaseDialog from '~/components/dialog/BaseDialog'

@Component
export default class CreateDialog extends mixins(BaseDialog) {
  newItem: Item = {} as Item

  createNewItem () {
    itemStore.create({
      listId: this.$route.params.listId,
      item: this.newItem
    })
  }
}
</script>

<style lang="css" scoped>

</style>
