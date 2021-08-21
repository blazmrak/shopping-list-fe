<template>
  <v-row justify="center">
    <v-col md="6" sm="12">
      <v-list>
        <template v-for="item in shoppingLists">
          <v-list-item
            :key="item.id"
            link
            :to="`/lists/${item.id}`"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-action>
              <v-icon
                color="grey"
              >
                mdi-chevron-right
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-col>

    <CreateDialog :show="showCreateDialog" @opened="isOpen" />
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { listStore } from '~/store/lists'
import CreateDialog from '~/components/lists/CreateDialog.vue'

@Component({
  components: { CreateDialog },
  middleware: 'auth'
})
export default class Lists extends Vue {
  showCreateDialog = false

  async fetch () {
    await listStore.fetchLists()
  }

  get shoppingLists () {
    return listStore.lists
  }

  isOpen (open: boolean) {
    this.showCreateDialog = open
  }
}
</script>

<style lang="css" scoped>

</style>
