<template>
  <div class="flex justify-center">
    <div class="flex flex-col content-start w-3/4 max-w-md mt-16">
      <div class="w-full">
        <img src="/img/login/login2.png">
      </div>
      <div>
        <RegisterForm @submitted="login" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import RegisterForm from '~/components/register/RegisterForm.vue'

@Component({
  components: { RegisterForm }
})
export default class Register extends Vue {
  async login (value: any) {
    try {
      await this.$axios.post('api/users/register', value)
      this.$toast.success('Account created', { duration: 1000, position: 'top-center' })
      this.$router.resolve('/login')
    } catch (e) {
      this.$toast.error('Registration failed', { duration: 1500, position: 'bottom-center' })
    }
  }
}
</script>

<style scoped>

</style>
