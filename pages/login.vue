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
        <LoginForm @submitted="login" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginForm from '../components/login/LoginForm.vue'

@Component({
  middleware: 'auth',
  auth: 'guest',
  components: { LoginForm }
})
export default class Login extends Vue {
  async login (form: { email: string, password: string }) {
    try {
      await this.$auth.loginWith('local', { data: { username: form.email, password: form.password } })
      this.$toast.success('Logged in successfully', { duration: 1000, position: 'top-center' })
    } catch (e) {
      if (e.response?.data?.code === 'login_invalid_credentials') {
        this.$toast.error('Wrong username or password', { duration: 1500, position: 'bottom-center' })
      } else if (e.response?.status === 504) {
        this.$toast.error('Server is not available', { duration: 1500, position: 'bottom-center' })
      } else {
        this.$toast.error('Something went wrong', { duration: 1500, position: 'bottom-center' })
      }
    }
  }
}
</script>

<style scoped>

</style>
