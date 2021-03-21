<template>
  <div class="flex justify-center">
    <form class="flex flex-col space-y-3 w-full" @submit.prevent="submitted">
      <FormField v-model="email" placeholder="Email" />
      <FormField v-model="password" type="password" placeholder="Password" />
      <div class="flex justify-center">
        <Button class="bg-purple-600 w-16" text="Sign in" />
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

<style lang="postcss" scoped>

</style>
