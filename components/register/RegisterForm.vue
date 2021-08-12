<template>
  <v-form
    @submit.prevent="submitted"
  >
    <v-text-field
      v-model="username"
      label="Email"
      required
    />
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      required
    />
    <v-text-field
      v-model="confirmPassword"
      type="password"
      label="Confirm Password"
      required
    />
    <v-btn type="submit">
      Register
    </v-btn>
  </v-form>
</template>

<script lang="ts">

import { Component, Emit, Vue } from 'nuxt-property-decorator'

@Component({
})
export default class RegisterForm extends Vue {
  username?: string = ''
  password?: string = ''
  confirmPassword?: string = ''

  @Emit()
  public submitted () {
    return {
      username: this.username,
      password: this.password
    }
  }
}
</script>

<style lang="css" scoped>

</style>
