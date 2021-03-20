<template>
  <div class="login-form-container">
    <form class="login-form" @submit="submitted">
      <FormField placeholder="Email" class="login-form-field" />
      <FormField type="password" placeholder="Password" class="login-form-field" />
      <div class="login-buttons">
        <Button class="login-btn" text="Sign in" />
      </div>
      <input type="submit" class="hidden">
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
import FormField from '~/components/forms/FormField.vue'
import Button from '~/components/forms/Button.vue'

@Component({
  components: { Button, FormField }
})
export default class LoginForm extends Vue {
  email?: string
  password?: string

  @Emit()
  public submitted (e: Event) {
    e.preventDefault()
    return {
      email: this.email,
      password: this.password
    }
  }
}
</script>

<style lang="postcss" scoped>

.login-form-container {
  @apply flex justify-center
}

.login-form {
  @apply w-full
}

.login-form-field {
  @apply mb-4
}

.login-buttons {
  @apply flex justify-center
}

.login-btn {
  @apply bg-purple-600 w-16
}
</style>
