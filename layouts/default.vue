<template>
  <v-app>
    <Menu :items="menuItems" />

    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggle()" />
      <v-app-bar-title>Kostko</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Menu, { MenuItem } from '~/components/navigation/Menu.vue'
import { menuStore } from '~/store/menu'

@Component({
  components: { Menu }
})
export default class DefaultLayout extends Vue {
  menuItems: MenuItem[] = [
    { title: 'Lists', icon: 'mdi-format-list-bulleted', roles: ['user'], path: 'lists' }
  ]

  toggle () {
    menuStore.toggle()
  }
}
</script>

<style lang="css">
</style>
