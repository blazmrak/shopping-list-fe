<template>
  <v-dialog
    v-model="newListItemDialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        fab
        large
        bottom
        right
        absolute
        class="mb-15"
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
            <v-autocomplete
              v-model="newItem.itemId"
              :items="items"
              label="Items"
              item-text="name"
              item-value="id"
            />
            <v-text-field
              v-model="newItem.quantity"
              label="Quantity"
              type="number"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="newListItemDialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="createNewListItem()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { listItemStore } from '~/store/listItems'

@Component
export default class CreateDialog extends Vue {
  newListItemDialog = false
  newItem = {}

  createNewListItem () {
    listItemStore.createNewItem({
      listId: this.$route.params.listId,
      listItem: this.newItem
    })
  }
}
</script>

<style lang="postcss" scoped>

</style>
