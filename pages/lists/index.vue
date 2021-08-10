<template>
  <v-row justify="center">
    <v-col md="6" sm="12">
      <v-list>
        <template v-for="item in shoppingLists">
          <v-list-item
            :key="item.id"
            link
            :to="`/lists/${item.id}`"
            class="grey lighten-3"
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
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { listStore } from '~/store/lists'

@Component({ middleware: 'auth' })
export default class Lists extends Vue {
  async fetch () {
    await listStore.fetchLists()
  }

  get shoppingLists () {
    return listStore.lists
  }
}
</script>

<style lang="css" scoped>

</style>
