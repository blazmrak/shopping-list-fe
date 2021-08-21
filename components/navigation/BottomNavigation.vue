<template>
  <v-bottom-navigation
    grow
    fixed
    color="primary"
  >
    <template v-for="tab in tabs">
      <v-btn :key="tab.label" :to="tab.to">
        <span>{{ tab.label }}</span>
        <v-icon>{{ tab.icon }}</v-icon>
      </v-btn>
    </template>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { bottomNavigationStore } from '~/store/bottomNavigation'

@Component
export default class BottomNavigation extends Vue {
  get tabs () {
    return bottomNavigationStore.tabs
  }
}
</script>

<style lang="postcss" scoped>

</style>
