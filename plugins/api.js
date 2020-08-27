import signupApi from '@/api/signup'
import forgotApi from '@/api/forgot-password'

export default function({ $axios }, inject) {
  const repositories = {
    signup: signupApi($axios),
    forgotPassword: forgotApi($axios),
  }

  inject('api', repositories)
}
