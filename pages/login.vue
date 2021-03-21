<template>
  <div class="flex justify-center">
    <div class="flex flex-col content-start w-3/4 max-w-md mt-16">
      <div class="w-full">
        <img src="/img/login/login2.png">
      </div>
      <div>
        <LoginForm @submitted="login" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginForm from '../components/login/LoginForm.vue'

@Component({
  components: { LoginForm }
})
export default class Login extends Vue {
  async login (value: any) {
    try {
      await this.$auth.loginWith('local', { data: value })
      this.$toast.success('Logged in successfully', { duration: 1000, position: 'top-center' })
    } catch (e) {
      this.$toast.error('Wrong username or password', { duration: 1500, position: 'bottom-center' })
    }
  }
}
</script>

<style scoped>

</style>
