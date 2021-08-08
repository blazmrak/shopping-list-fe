<template>
  <v-form
    ref="form"
    class="content-fill"
    lazy-validation
    @submit.prevent="submitted"
  >
    <v-text-field
      v-model="email"
      label="Email"
      required
    />
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      required
    />
    <v-btn type="submit">
      Log in
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator'

@Component({
})
export default class LoginForm extends Vue {
  email?: string = ''
  password?: string = ''

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
