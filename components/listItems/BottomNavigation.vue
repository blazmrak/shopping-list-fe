<template>
  <v-bottom-navigation
    grow
    absolute
    hide-on-scroll
    color="primary"
  >
    <v-btn :to="`/lists/${$route.params.listId}/view`">
      <span>List</span>
      <v-icon>mdi-playlist-edit</v-icon>
    </v-btn>
    <v-btn :to="`/lists/${$route.params.listId}/items`">
      <span>Items</span>
      <v-icon>mdi-silverware</v-icon>
      <!--          <v-icon>mdi-fruit-watermelon</v-icon>-->
      <!--          <v-icon>mdi-cupcake</v-icon>-->
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BottomNavigation extends Vue {

}
</script>

<style lang="postcss" scoped>

</style>
