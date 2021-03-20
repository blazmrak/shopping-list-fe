<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-img">
        <img src="/img/login/login2.png">
      </div>
      <div class="form-container">
        <LoginForm @submitted="form" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginForm from '../components/login/LoginForm'

@Component({
  components: { LoginForm }
})
export default class Login extends Vue {
  formValue: any = null

  form (value: any) {
    this.formValue = value
  }
}
</script>

<style scoped>
.form-container {
}

.login-content {
  @apply w-3/4 max-w-md flex flex-col content-start mt-16
}

.login-container {
  @apply flex justify-center content-center
}

.login-img {
  @apply w-full
}
</style>
