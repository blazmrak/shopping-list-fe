<template>
  <v-col>
    <v-row justify="center">
      <v-col cols="4">
        <v-img
          lazy-src="/img/login/login2.png"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="4" md="6" sm="12">
        <RegisterForm @submitted="login" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import RegisterForm from '~/components/register/RegisterForm.vue'

@Component({
  middleware: 'auth',
  auth: 'guest',
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
