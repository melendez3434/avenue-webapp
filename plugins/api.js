import signupApi from '@/api/signup'
import forgotApi from '@/api/forgot-password'
import talentApi from '@/api/talent'

export default function({ $axios }, inject) {
  const repositories = {
    signup: signupApi($axios),
    forgotPassword: forgotApi($axios),
    talent: talentApi($axios),
  }

  inject('api', repositories)
}
