<template>
  <v-app>
    <Menu :items="menuItems" />

    <v-app-bar app>
      <v-toolbar-title>
        Kostko
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click="toggle()" />

      <template v-if="tabs.length > 0" #extension>
        <AppBarTabs />
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <BottomNavigation v-if="navigationTabs.length > 0" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Menu, { MenuItem } from '~/components/navigation/Menu.vue'
import AppBarTabs from '~/components/navigation/AppBarTabs.vue'
import BottomNavigation from '~/components/navigation/BottomNavigation.vue'
import { menuStore } from '~/store/menu'
import { tabsStore } from '~/store/tabs'
import { bottomNavigationStore } from '~/store/bottomNavigation'

@Component({
  components: { Menu, AppBarTabs, BottomNavigation }
})
export default class DefaultLayout extends Vue {
  menuItems: MenuItem[] = [
    { title: 'Lists', icon: 'mdi-format-list-bulleted', roles: ['user'], path: 'lists' }
  ]

  get tabs () {
    return tabsStore.tabs
  }

  get navigationTabs () {
    return bottomNavigationStore.tabs
  }

  toggle () {
    menuStore.toggle()
  }
}
</script>

<style lang="css">
</style>
