<template>
  <div class="flex justify-center">
    <form class="flex flex-col space-y-3 w-full" @submit.prevent="submitted">
      <v-text-field v-model="email" label="Email" />
      <v-text-field v-model="password" type="password" label="Password" />
      <v-text-field v-model="confirmPassword" type="password" label="Confirm Password" />
      <div class="flex justify-center">
        <v-btn type="submit" class="bg-purple-600 w-16">
          Register
        </v-btn>
      </div>
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
