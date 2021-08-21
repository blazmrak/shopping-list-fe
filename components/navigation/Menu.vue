<template>
  <v-navigation-drawer right app :value="show" @input="setShow">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Menu
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="'/' + item.path"
        @click="hide()"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template #append>
      <div v-if="loggedIn" class="pa-2">
        <v-btn class="primary" block @click="logout()">
          Logout
        </v-btn>
      </div>

      <div v-if="!loggedIn" class="pa-2">
        <v-btn class="primary" block to="/login">
          Login
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { menuStore } from '~/store/menu'

export interface MenuItem {
  icon: string,
  title: string,
  path: string
  roles?: string[],
}

@Component
export default class Menu extends Vue {
  @Prop({ default: () => [], required: true, type: Array })
  items!: MenuItem[]

  get show () {
    return menuStore.show
  }

  get menuItems () {
    const user = this.$auth.user

    return this.items.filter(item => !item.roles || item.roles.includes(user?.roles as string))
  }

  get loggedIn () {
    return !!this.$auth.user
  }

  logout () {
    this.$auth.logout()
  }

  hide () {
    menuStore.hide()
  }

  setShow (show: boolean) {
    menuStore.setShow(show)
  }
}
</script>

<style lang="css" scoped>

</style>
