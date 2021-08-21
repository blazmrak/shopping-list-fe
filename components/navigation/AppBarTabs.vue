<template>
  <v-tabs centered fixed-tabs>
    <template v-for="(tab, index) in tabs">
      <v-tab :key="index" :to="tab.to">
        {{ tab.label }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </template>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { tabsStore } from '~/store/tabs'

@Component
export default class AppBarTabs extends Vue {
  get tabs () {
    return tabsStore.tabs
  }
}
</script>

<style lang="postcss" scoped>

</style>
