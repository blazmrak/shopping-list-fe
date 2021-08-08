<template>
  <div class="flex justify-center">
    <form class="flex flex-col space-y-3 w-full" @submit.prevent="submitted">
      <v-input v-model="email" placeholder="Email" />
      <v-input v-model="password" type="password" placeholder="Password" />
      <v-input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
      <div class="flex justify-center">
        <v-btn class="bg-purple-600 w-16">
          Register
        </v-btn>
      </div>
      <input type="submit" class="hidden">
    </form>
  </div>
</template>

<script lang="ts">

import { Component, Emit, Vue } from 'nuxt-property-decorator'

@Component({
})
export default class RegisterForm extends Vue {
  email?: string = ''
  password?: string = ''
  confirmPassword?: string = ''

  @Emit()
  public submitted () {
    return {
      email: this.email,
      password: this.password
    }
  }
}
</script>

<style lang="css" scoped>

</style>
